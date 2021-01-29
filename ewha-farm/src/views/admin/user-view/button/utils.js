// eslint-disable-next-line import/prefer-default-export

export const buttonList = [
  { label: '커튼', value: 'curtain' },
  { label: '천장', value: 'ceiling' },
  { label: '사료급이기', value: 'feeder' },
  { label: '조명', value: 'light' },
  { label: '선풍기', value: 'fan' },
  { label: '안개분무기', value: 'sprayer' },
  { label: '인버터', value: 'inverter' },
]

export const signalList = [
  { label: '토글', value: 'toggle' },
]

export function getButtonLabel(value) {
  return buttonList.find(el => value === el.value)
}

export function getSignalLabel(value) {
  return signalList.find(el => value === el.value)
}
