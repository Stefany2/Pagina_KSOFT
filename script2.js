document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los datos del formulario
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const service = document.getElementById('service').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Crear mensaje para WhatsApp
        const whatsappMessage = `Hola KSOFT,%0A%0A*Nombre:* ${name} ${lastname}%0A*Servicio de interés:* ${service}%0A*Teléfono:* ${phone}%0A*Mensaje:* ${message}`;
        
        // Redirigir a WhatsApp
        window.open(`https://wa.me/931576209?text=${whatsappMessage}`, '_blank');
        
        // Opcional: Generar PDF (requiere librería jsPDF)
        // generatePDF(name, lastname, service, phone, message);
    });
});

// Función para generar PDF (requiere incluir la librería jsPDF)
function generatePDF(name, lastname, service, phone, message) {
    // Esta función requiere la librería jsPDF
    // Puedes incluirla con: <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    if (typeof jsPDF !== 'undefined') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('Formulario de Contacto KSOFT', 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Nombre: ${name} ${lastname}`, 20, 40);
        doc.text(`Servicio de interés: ${service}`, 20, 50);
        doc.text(`Teléfono: ${phone}`, 20, 60);
        doc.text(`Mensaje: ${message}`, 20, 70);
        
        doc.save('contacto_ksoft.pdf');
    } else {
        console.error('La librería jsPDF no está cargada');
    }
}