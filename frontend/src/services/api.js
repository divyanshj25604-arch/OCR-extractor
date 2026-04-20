export const extractText = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://127.0.0.1:8000/extract", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("API failed");
  }

  return res.json();
};