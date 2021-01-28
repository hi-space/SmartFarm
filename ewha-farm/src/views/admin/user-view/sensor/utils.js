// eslint-disable-next-line import/prefer-default-export

export const sensorList = [
  { label: '온도 센서', value: 'temperature' },
  { label: '습도 센서', value: 'humidity' },
  { label: '우적 센서', value: 'rain' },
  { label: '황화수소', value: 'hs2' },
  { label: '암모니아', value: 'nh3' },
]

export function getSensorLabel(value) {
  return sensorList.find(el => value === el.value)
}
