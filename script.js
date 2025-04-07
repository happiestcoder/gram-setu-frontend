const complaintForm = document.getElementById('complaintForm');
const complaintCards = document.getElementById('complaintCards');
const statusFilter = document.getElementById('statusFilter');
let complaints = [];

complaintForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const category = document.getElementById('category').value;
  const text = document.getElementById('complaintText').value;

  const complaint = {
    id: Date.now(),
    name,
    email,
    category,
    text,
    status: 'pending'
  };

  complaints.push(complaint);
  renderComplaints();
  complaintForm.reset();
});

statusFilter.addEventListener('change', renderComplaints);

function renderComplaints() {
  complaintCards.innerHTML = '';
  const filter = statusFilter.value;
  const filtered = complaints.filter(c => filter === 'all' || c.status === filter);

  filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${c.category.toUpperCase()}</h4>
      <p>${c.text}</p>
      <p>Status: <strong>${c.status}</strong></p>
      <button onclick="updateStatus(${c.id})">Mark as Resolved</button>
    `;
    complaintCards.appendChild(card);
  });
}

function updateStatus(id) {
  complaints = complaints.map(c => c.id === id ? { ...c, status: 'resolved' } : c);
  renderComplaints();
}

const infoCards = document.getElementById('infoCards');
const searchSchemes = document.getElementById('searchSchemes');
let schemes = [
  { title: "Compost Subsidy Yojana", desc: "Provides subsidies to farmers who convert agri waste into compost." },
  { title: "Agri Waste to Biogas", desc: "Support scheme for installing biogas plants in rural areas." },
  { title: "Crop Residue Management", desc: "Encourages use of crop residue management machinery." },
  { title: "Bio-Enzyme Training", desc: "Workshops for women SHGs to convert agri waste into cleaning products." }
];

searchSchemes.addEventListener('input', renderSchemes);

function renderSchemes() {
  infoCards.innerHTML = '';
  const search = searchSchemes.value.toLowerCase();
  const filtered = schemes.filter(s => s.title.toLowerCase().includes(search));

  filtered.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h4>${s.title}</h4><p>${s.desc}</p>`;
    infoCards.appendChild(card);
  });
}

renderSchemes();
