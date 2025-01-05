export function stringToColor(str: string) {
  if (!str) return "#000000" // Default color for empty input

  let hash = 0

  // Generate hash value
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  // Convert hash to RGB
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff // Extract 8 bits
    color += value.toString(16).padStart(2, "0") // Convert to 2-digit hex
  }

  return color
}

export function formatRole(role: string) {
  const formattedRole =
    role.charAt(0).toLocaleUpperCase() + role.slice(1).toLocaleLowerCase()
  return formattedRole
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("")
}

export function fullName(
  firstname: string | undefined,
  lastname: string | undefined
): string {
  const trimmedFirst = firstname?.trim() || ""
  const trimmedLast = lastname?.trim() || ""
  return [trimmedFirst, trimmedLast].filter(Boolean).join(" ")
}

export function downloadFile(origin: string, filePath: string) {
  const fileUrl = `${origin}${filePath}`
  fetch(fileUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filePath.split("/").pop() || "file"
      link.click()
      window.URL.revokeObjectURL(url)
    })
    .catch((error) => console.error("Error downloading file: ", error))
}
