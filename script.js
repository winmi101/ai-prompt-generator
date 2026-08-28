function generatePrompt() {
  const category = document.getElementById("category").value;
  const topic = document.getElementById("topic").value.trim();
  const output = document.getElementById("output");

  if (!topic) {
    output.value = "Please enter a topic first.";
    return;
  }

  const templates = {
    facebook: `Create a highly engaging Facebook post about "${topic}". Include a strong hook, useful information, a natural CTA, and relevant hashtags.`,

    tiktok: `Create a short viral TikTok content idea about "${topic}". Include a 3-second hook, scene structure, caption, and hashtags.`,

    image: `Create a detailed photorealistic AI image prompt about "${topic}". Include composition, lighting, camera angle, environment, and visual style.`,

    video: `Create a cinematic AI video prompt about "${topic}". Include scene progression, camera movement, lighting, atmosphere, and realistic motion.`,

    gardening: `Create a beginner-friendly gardening guide about "${topic}". Include practical steps, common mistakes, useful tips, and a short social media caption.`
  };

  output.value = templates[category];
}

function copyPrompt() {
  const output = document.getElementById("output");

  if (!output.value) return;

  navigator.clipboard.writeText(output.value);
  alert("Prompt copied!");
}
