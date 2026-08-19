
document.getElementById('invoiceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai dari form
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const no_tlp = document.getElementById('no_tlp').value;
    const nama_barang = document.getElementById('nama_barang').value;
    const satuan = document.getElementById('satuan').value;
    const jumlah = document.getElementById('jumlah').value;
    const harga = document.getElementById('harga').value;
    const dp = document.getElementById('dp').value;

    // Generate Invoice ID
    const random = Math.floor(10000 + Math.random() * 90000);
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const invoiceId = `${random}-${month}${year}`;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header Info Perusahaan
    doc.setFontSize(16);
    doc.text("GALLERY CAHAYA MANDIRI", 20, 20);
    doc.setFontSize(10);
    doc.text("Alamat: Margomulyo No. 46, Greges, Kec. Asemrowo, Surabaya", 20, 26);
    doc.text("Telepon: 0812 3337 7745", 20, 31);
    
    // Invoice Title
    doc.setFontSize(18);
    doc.text("INVOICE", 180, 20, { align: "right" });
    doc.setFontSize(12);
    doc.text(`No. Invoice: ${invoiceId}`, 180, 26, { align: "right" });
    
    // Data Pelanggan
    doc.line(20, 35, 190, 35);
    doc.text(`Kepada: ${nama}`, 20, 42);
    doc.text(`Alamat: ${alamat}`, 20, 48);
    doc.text(`Tanggal: ${date.toLocaleDateString('id-ID')}`, 140, 42);

    // Tabel Header
    doc.setFillColor(230, 230, 230);
    doc.rect(20, 60, 170, 10, 'F');
    doc.setFontSize(10);
    doc.text("NO", 25, 66);
    doc.text("NAMA BARANG", 40, 66);
    doc.text("JUMLAH", 100, 66);
    doc.text("UNIT", 125, 66);
    doc.text("HARGA", 145, 66);
    doc.text("TOTAL", 170, 66);

    // Isi Tabel
    doc.text("1", 25, 76);
    doc.text(nama_barang, 40, 76);
    doc.text(jumlah, 105, 76);
    doc.text(satuan, 125, 76);
    doc.text(parseInt(harga).toLocaleString('id-ID'), 145, 76);
    doc.text((jumlah * harga).toLocaleString('id-ID'), 170, 76);

    // Total & DP
    let y = 90;
    doc.line(20, y, 190, y);
    y += 10;
    doc.text("TOTAL HARGA:", 140, y);
    doc.text((jumlah * harga).toLocaleString('id-ID'), 180, y, { align: "right" });
    
    y += 7;
    doc.text("DP (DOWN PAYMENT):", 140, y);
    doc.text(parseInt(dp).toLocaleString('id-ID'), 180, y, { align: "right" });

    // Info Pembayaran
    y += 20;
    doc.setFontSize(10);
    doc.text("Informasi Pembayaran:", 20, y);
    y += 6;
    doc.text("Silahkan transfer ke rekening: BCA - 6670452270 (A.n Nuria)", 20, y);

    // Footer
    doc.setFontSize(8);
    doc.text("(BELUM TERMASUK BIAYA ONGKIR DAN PPN)", 20, y + 20);
    doc.text("Terima kasih telah memilih produk kami!", 20, y + 25);

    doc.save(`invoice_${invoiceId}.pdf`);
});
