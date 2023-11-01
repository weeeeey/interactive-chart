export function scrollMove($target) {
    document.querySelector($target).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
}
