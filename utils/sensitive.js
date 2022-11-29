// 敏感词
const list = [
  '裸',
  '共产党',
  '国民党',
  '色情',
  '情色',
]

// 过滤敏感词
export function filter(word) {
  for (const item of list) {
    word = word.replaceAll(item, '')
  }
  return word
}