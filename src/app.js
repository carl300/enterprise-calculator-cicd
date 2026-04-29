const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function validateNumbers(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return { valid: false, error: "Both a and b must be valid numbers." };
  }

  return { valid: true, numA, numB };
}

app.get("/", (req, res) => {
  res.status(200).json({
    service: "enterprise-calculator-api",
    status: "running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime()
  });
});

app.get("/add", (req, res) => {
  const validation = validateNumbers(req.query.a, req.query.b);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  res.json({
    operation: "addition",
    result: validation.numA + validation.numB
  });
});

app.get("/subtract", (req, res) => {
  const validation = validateNumbers(req.query.a, req.query.b);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  res.json({
    operation: "subtraction",
    result: validation.numA - validation.numB
  });
});

app.get("/multiply", (req, res) => {
  const validation = validateNumbers(req.query.a, req.query.b);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  res.json({
    operation: "multiplication",
    result: validation.numA * validation.numB
  });
});

app.get("/divide", (req, res) => {
  const validation = validateNumbers(req.query.a, req.query.b);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  if (validation.numB === 0) {
    return res.status(400).json({
      error: "Division by zero is not allowed."
    });
  }

  res.json({
    operation: "division",
    result: validation.numA / validation.numB
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Calculator API running on port ${PORT}`);
  });
}

module.exports = app;
