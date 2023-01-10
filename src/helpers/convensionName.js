export const convensionName = (name) => {
  const filteredName = name.trim().toLowerCase(); 
  const componentName = filteredName[0].toUpperCase() + filteredName.substring(1);
  return componentName;
}