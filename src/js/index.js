(function () {
  var el = document.getElementById('list');
  fetch('src/backup.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (arr) {
      if (!Array.isArray(arr) || !arr.length) {
        el.textContent = 'バックアップはまだありません。';
        return;
      }
      el.innerHTML = arr.map(function (e) {
        return (
          '<details>' +
          '<summary><strong>' + (e.path || '(unknown)') + '</strong> — ' + (e.datetime || '') + '</summary>' +
          '<p>' + (e.message || '') + ' / ' + (e.userName || e.userId || '') + '</p>' +
          '<p class="mono">' + (e.backupPath || '') + '</p>' +
          '</details>'
        );
      }).join('');
    })
    .catch(function (err) {
      el.textContent = 'backup.json の読み込みに失敗しました: ' + err.message;
    });
})();
