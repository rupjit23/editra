

export async function executeCode(language, sourceCode) {
  const langMap = {
    javascript: 63, 
    python: 71,
    java: 62,
    cpp: 54,
    c: 50,
  };

  const languageId = langMap[language] || 63;

  
  const response = await fetch(
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
    },
    body: JSON.stringify({
      language_id: languageId,
      source_code: sourceCode,
    }),
  }
);


  const { token } = await response.json();


  let result;
  while (true) {
    const getRes = await fetch(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": "0c0d2ac652mshc49da668d6b58f3p1d80f9jsn13d58ca53c66",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        },
      }
    );
    result = await getRes.json();

    if (result.status?.id >= 3) break; 
    await new Promise((r) => setTimeout(r, 1000)); 
  }

  
  return {
    output:
      result.stdout ||
      result.compile_output ||
      result.stderr ||
      result.message ||
      "⚠️ No output returned",
    status: result.status?.description || "Unknown",
  };
}
