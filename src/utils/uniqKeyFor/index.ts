let uniqKeyFlag = 0;
export default function uniqKeyFor() {
  uniqKeyFlag++;
  return ''.concat('u-', Date.now().toString(), '-', uniqKeyFlag.toString());
}
