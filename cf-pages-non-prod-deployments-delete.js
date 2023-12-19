const deleteNonProdDeployments = async (observer) => {
  const trList = document.querySelectorAll('tbody>tr')
  if (trList.length > 1) {
    const latestRow = trList[trList.length - 1]

    const actionButton = latestRow.querySelector('td:last-child button')
    actionButton.click()

    const deleteButton = latestRow.querySelector('td:last-child button+div a:last-child')
    deleteButton.click()
  } else {
    observer.disconnect()
  }
}

const observer = new MutationObserver((mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      if (mutation.removedNodes.length > 0) {
        deleteNonProdDeployments(observer)
      }

      if (mutation.addedNodes.length > 0) {
        const deleteSubmit = document.querySelector('button[type=submit]')
        deleteSubmit.click()
      }
    }
  }
})

observer.observe(document.body, { childList: true })

deleteNonProdDeployments(observer)
