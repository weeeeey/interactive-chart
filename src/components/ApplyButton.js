export default function ApplyButton({ $app }) {
    this.$applyContent = document.createElement('div');
    this.$applyContent.className = 'ApplyContent';
    this.$applyContent.innerHTML = `
            <button class="ApplyButton">Apply</button>
        `;
    $app.appendChild(this.$applyContent);
}
