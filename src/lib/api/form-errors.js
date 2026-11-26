export function applyApiFieldErrors(setError, error) {
  for (const { field, message } of error.fields ?? []) {
    if (field) setError(field, { type: "server", message });
  }
}
