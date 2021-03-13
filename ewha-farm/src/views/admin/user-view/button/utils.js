// eslint-disable-next-line import/prefer-default-export

export const buttonList = [
  { label: '커튼', value: 'curtain' },
  { label: '천장', value: 'ceiling' },
  { label: '사료급이기', value: 'feeder' },
  { label: '조명', value: 'light' },
  { label: '선풍기', value: 'fan' },
  { label: '안개분무기', value: 'sprayer' },
  { label: '인버터', value: 'inverter' },
  { label: '유압제어기', value: 'hydraulic' },
]

export const signalList = [
  { label: '토글', value: 'toggle' },
  { label: '트리거', value: 'trigger' },
]

export function getButtonLabel(value) {
  const result = buttonList.find(el => value === el.value)
  if (result === undefined) {
    return ''
  }
  return result
}

export function getSignalLabel(value) {
  const result = signalList.find(el => value === el.value)
  if (result === undefined) {
    return ''
  }
  return result
}
