const category = document.getElementById("category");
const tone = document.getElementById("tone");
const length = document.getElementById("length");
const language = document.getElementById("language");
const topic = document.getElementById("topic");
const output = document.getElementById("output");
const status = document.getElementById("status");

const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");
const ideaButton = document.getElementById("ideaButton");
const themeToggle = document.getElementById("themeToggle");

const categoryInstructions = {
  facebook:
    "Create a highly engaging Facebook post with a strong opening hook, useful body content, natural call to action, and relevant hashtags.",

  tiktok:
    "Create a TikTok content concept with a strong first 3-second hook, short scene structure, on-screen text ideas, caption, and relevant hashtags.",

  youtube:
    "Create a YouTube content concept including a clickable title, opening hook, video structure, audience retention ideas, description, and call to action.",

  image:
    "Create a detailed AI image generation prompt including subject, environment, composition, camera angle, lighting, realism, visual style, and important details.",

  video:
    "Create a cinematic AI video generation prompt including scene progression, subject movement, camera movement, environment, lighting, atmosphere, and realistic motion.",

  blog:
    "Create a useful blog content prompt including a compelling title, introduction, logical section structure, key points, conclusion, and reader call to action.",

  seo:
    "Create an SEO-focused content prompt including search intent, primary keyword, supporting keywords, article structure, headings, useful information, and natural optimization.",

  product:
    "Create a persuasive product description prompt covering benefits, features, customer problem, use cases, emotional appeal, and a clear call to action.",

  email:
    "Create an effective email writing prompt including subject line, opening, clear message, appropriate tone, concise structure, and call to action.",

  gardening:
    "Create a beginner-friendly gardening content prompt including practical steps, common mistakes, useful tips, warnings, and easy-to-follow instructions.",

  education:
    "Create an educational content prompt that explains the topic clearly for beginners using simple examples, structured sections, key facts, and a short summary.",

  coding:
    "Create a coding assistant prompt that clearly explains the problem, desired behavior, technical requirements, edge cases, code quality expectations, and output format."
};

const randomIdeas = [
  "How to grow tomatoes in small containers",
  "5 simple ways to improve productivity",
  "Beginner guide to composting",
  "How solar panels generate electricity",
  "Best tips for creating viral short videos",
  "How to write better AI prompts",
  "Simple indoor gardening ideas",
  "How rainwater harvesting works",
  "Beginner guide to personal branding",
  "How to create engaging social media posts",
  "Easy plant propagation methods",
  "How artificial intelligence helps small businesses"
];

function generatePrompt() {
  const topicValue = topic.value.trim();

  if (!topicValue) {
    status.textContent = "Enter a topic first";
    topic.focus();
    return;
  }

  const selectedCategory = category.value;
  const selectedTone = tone.value;
  const selectedLength = length.value;
  const selectedLanguage = language.value;

  const detailInstructions = {
    short:
      "Keep the result concise, practical, and focused on the most important details.",

    medium:
      "Provide enough detail to produce a useful, high-quality result without unnecessary repetition.",

    detailed:
      "Provide a comprehensive result with clear structure, specific instructions, useful examples where appropriate, and strong attention to quality."
  };

  const promptText = `
You are an expert AI content creator and prompt engineer.

TOPIC:
"${topicValue}"

TASK:
${categoryInstructions[selectedCategory]}

TONE:
Use a ${selectedTone} tone.

DETAIL LEVEL:
${detailInstructions[selectedLength]}

OUTPUT LANGUAGE:
Write the final result in ${selectedLanguage}.

QUALITY REQUIREMENTS:
- Make the result clear and practical.
- Avoid unnecessary filler.
- Make the content useful for real-world use.
- Use natural language.
- Keep the information logically structured.
- Do not invent unsupported facts.
- Make the final output ready to copy and use immediately.

Now create the best possible result for the topic above.
`.trim();

  output.value = promptText;
  status.textContent = "Prompt generated";
}

async function copyPrompt() {
  if (!output.value.trim()) {
    status.textContent = "Nothing to copy";
    return;
  }

  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent = "Copied!";
    copyButton.textContent = "✅ Copied";

    setTimeout(() => {
      copyButton.textContent = "📋 Copy Prompt";
      status.textContent = "";
    }, 1800);
  } catch {
    output.select();
    document.execCommand("copy");
    status.textContent = "Copied!";
  }
}

function clearPrompt() {
  topic.value = "";
  output.value = "";
  status.textContent = "";
  topic.focus();
}

function randomIdea() {
  const idea =
    randomIdeas[Math.floor(Math.random() * randomIdeas.length)];

  topic.value = idea;
  status.textContent = "Random idea selected";
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  themeToggle.textContent = isDark
    ? "☀️ Light"
    : "🌙 Dark";

  localStorage.setItem(
    "theme",
    isDark ? "dark" : "light"
  );
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light";
  }
}

generateButton.addEventListener("click", generatePrompt);
copyButton.addEventListener("click", copyPrompt);
clearButton.addEventListener("click", clearPrompt);
ideaButton.addEventListener("click", randomIdea);
themeToggle.addEventListener("click", toggleTheme);

topic.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    generatePrompt();
  }
});

loadTheme();
