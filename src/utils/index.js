const getFirstLetter = (name) => {
  if (!name) return "";
    
    return name?.charAt(0) ?? "";
}

export {
    getFirstLetter
}
