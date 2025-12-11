export const phone = {
  mounted(el: HTMLElement) {
    const input = el as HTMLInputElement
    if (input.value) {
      input.value = formatPhoneNumber(input.value)
    }
    input.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement
      const formatted = formatPhoneNumber(target.value)

      if (formatted !== target.value) {
        target.value = formatted
        target.dispatchEvent(new Event('input'))
      }
    })
  }
}

function formatPhoneNumber(value: string): string {
  if (!value) return ''
  let numbers = value.replace(/\D/g, '')
  numbers = numbers.substring(0, 11)
  if (numbers.length === 0) return ''
  if (!/^[78]/.test(numbers)) {
    numbers = '7' + numbers.substring(1)
  }
  let formattedNumber = '+7'
  if (numbers.length > 1) formattedNumber += ' (' + numbers.substring(1, 4)
  if (numbers.length >= 5) formattedNumber += ') ' + numbers.substring(4, 7)
  if (numbers.length >= 8) formattedNumber += '-' + numbers.substring(7, 9)
  if (numbers.length >= 10) formattedNumber += '-' + numbers.substring(9, 11)
  return formattedNumber
}

export const formatPhone = (phone: string | undefined): string =>
  phone?.replace(/\D/g, '') || ''
