module.exports = function fractionsFilter(string) {
  if (!string) {
    return "";
  }

  return string
    .replace("1/2", "½")
    .replace("1/3", "⅓")
    .replace("2/3", "⅔")
    .replace("1/4", "¼")
    .replace("3/4", "¾")
    .replace("1/5", "⅕")
    .replace("2/5", "⅖")
    .replace("3/5", "⅗")
    .replace("4/5", "⅘");
};
