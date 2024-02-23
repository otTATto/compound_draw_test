var svg;
var smiles = "";

// 化合物を描画・表示させる関数
function draw() {
    // 描画
    smiles = document.getElementById("input").value;    // 入力
    if (!smiles) return;
    var mol = RDKit.get_mol(smiles);
    var dest = document.getElementById("output");
    svg = mol.get_svg();
    dest.innerHTML = "<div id='drawing'>" + svg + "</div>"; // 表示

    // ダウンロードボタンの表示
    $('#downloadBtn').removeClass('unvisible').addClass('visible');
}

function downloadSvg() {
    svg = document.getElementById('drawing').querySelector('svg');
    const svgText = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const a = document.createElement('a');
    a.href = svgUrl;
    a.download = smiles;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(svgUrl);
}

window.draw = draw;
window.downloadSvg = downloadSvg;
export { draw, downloadSvg };