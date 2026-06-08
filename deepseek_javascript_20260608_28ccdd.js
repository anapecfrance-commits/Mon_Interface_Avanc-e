const PROVIDERS = {
    mistral: {
        name: "Mistral",
        endpoint: "https://api.mistral.ai/v1/chat/completions",
        defaultModel: "mistral-small-latest",
        models: ["mistral-small-latest", "mistral-medium-latest", "codestral-latest"]
    },
    deepseek: {
        name: "DeepSeek",
        endpoint: "https://api.deepseek.com/chat/completions",
        defaultModel: "deepseek-v4-flash",   // ✅ Nom valide à jour
        models: ["deepseek-v4-flash", "deepseek-v4-pro"]   // ✅ Liste à jour
        // ⚠️ Les anciens noms "deepseek-chat" et "deepseek-coder" sont obsolètes
    }
};

async function testApiKey(provider, apiKey, model) {
    const prov = PROVIDERS[provider];
    try {
        const res = await fetch(prov.endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: "user", content: "Say 'OK' in one word" }],
                max_tokens: 5
            })
        });
        return res.ok;
    } catch(e) {
        return false;
    }
}