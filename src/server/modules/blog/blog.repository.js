import { pool } from "@/server/db/connection";

const BLOG_COLUMNS = `
  id,
  title,
  slug,
  description,
  content,
  featured_image AS "featuredImage",
  category,
  status,
  meta_title AS "metaTitle",
  meta_description AS "metaDescription",
  published_at AS "publishedAt",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

const BLOG_FIELD_MAP = {
  title: "title",
  slug: "slug",
  description: "description",
  content: "content",
  featuredImage: "featured_image",
  category: "category",
  status: "status",
  metaTitle: "meta_title",
  metaDescription: "meta_description",
};

// CREATE BLOG
export async function createBlog(blog) {
  const {
    title,
    slug,
    description,
    content,
    featuredImage = null,
    category,
    status = "draft",
    metaTitle = null,
    metaDescription = null,
  } = blog;

  const { rows } = await pool.query(
    `
      INSERT INTO blogs (
        title,
        slug,
        description,
        content,
        featured_image,
        category,
        status,
        meta_title,
        meta_description,
        published_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7::varchar, $8, $9,
        CASE
          WHEN $7::varchar = 'published' THEN NOW()
          ELSE NULL
        END
      )
      RETURNING ${BLOG_COLUMNS}
    `,
    [
      title,
      slug,
      description,
      content,
      featuredImage,
      category,
      status,
      metaTitle,
      metaDescription,
    ],
  );

  return rows[0];
}

// READ ALL BLOGS WITH PAGINATION AND SEARCH
export async function findAllBlogs({ page = 1, limit = 10, search = "" } = {}) {
  const offset = (page - 1) * limit;
  const escapedSearch = search.trim().replace(/[\\%_]/g, "\\$&");

  const searchTerm = `%${escapedSearch}%`;
  const searchCondition = `
    WHERE (
      title ILIKE $1
      OR description ILIKE $1
      OR category ILIKE $1
    )
  `;

  const [blogsResult, countResult] = await Promise.all([
    pool.query(
      `
        SELECT ${BLOG_COLUMNS}
        FROM blogs
        ${searchCondition}
        ORDER BY created_at DESC, id DESC
        LIMIT $2 OFFSET $3
      `,
      [searchTerm, limit, offset],
    ),

    pool.query(
      `
        SELECT COUNT(*) AS total
        FROM blogs
        ${searchCondition}
      `,
      [searchTerm],
    ),
  ]);

  const total = Number(countResult.rows[0].total);

  return {
    blogs: blogsResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// READ BLOG BY SLUG
export async function findBlogBySlug(slug) {
  const { rows } = await pool.query(
    `
      SELECT ${BLOG_COLUMNS}
      FROM blogs
      WHERE slug = $1
    `,
    [slug],
  );

  return rows[0] ?? null;
}

// UPDATE BLOG BY SLUG
export async function updateBlogBySlug(slug, updates) {
  const fields = Object.entries(updates).filter(
    ([key, value]) => Object.hasOwn(BLOG_FIELD_MAP, key) && value !== undefined,
  );

  if (fields.length === 0) {
    throw new Error("No valid fields provided for update");
  }

  const values = fields.map(([, value]) => value);

  const assignments = fields.map(
    ([key], index) => `${BLOG_FIELD_MAP[key]} = $${index + 1}`,
  );

  const statusIndex = fields.findIndex(([key]) => key === "status");

  if (statusIndex !== -1) {
    assignments.push(`
    published_at = CASE
      WHEN $${statusIndex + 1}::varchar = 'published'
      THEN COALESCE(published_at, NOW())
      ELSE NULL
    END
  `);
  }

  assignments.push("updated_at = NOW()");

  values.push(slug);

  const { rows } = await pool.query(
    `
      UPDATE blogs
      SET ${assignments.join(", ")}
      WHERE slug = $${values.length}
      RETURNING ${BLOG_COLUMNS}
    `,
    values,
  );

  return rows[0] ?? null;
}

// DELETE BLOG BY SLUG
export async function deleteBlogBySlug(slug) {
  const { rows } = await pool.query(
    `
      DELETE FROM blogs
      WHERE slug = $1
      RETURNING id, slug
    `,
    [slug],
  );

  return rows[0] ?? null;
}
