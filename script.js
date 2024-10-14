document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // 防止页面刷新

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    alert(`谢谢您, ${name}！您的留言已收到。`);
    this.reset(); // 重置表单
});
