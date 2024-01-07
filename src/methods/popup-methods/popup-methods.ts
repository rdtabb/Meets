export const handlePopup = (
    popup: HTMLDivElement,
    operation: 'open' | 'close'
): Promise<unknown> | undefined => {
    if (operation === 'close') {
        popup.setAttribute('data-visible', 'false')
        return new Promise((res) =>
            setTimeout(() => {
                popup.classList.remove('popup_opened')
                res(200)
            }, 200)
        )
    } else {
        popup.setAttribute('data-visible', 'true')
        popup.classList.add('popup_opened')
    }
}
