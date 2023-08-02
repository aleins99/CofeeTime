export function addPeriod(num) {
  const strNum = num.toString();
  let slc = strNum.length;
  slc = slc % 2 === 0 ? slc / 2 - 1 : slc / 2;
  const newStrNum =
    strNum.length > 3 ? strNum.slice(0, slc) + "." + strNum.slice(slc) : strNum;
  return newStrNum;
}
