function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function displayDiagnosis() {
    const symptomsInput = document.getElementById('symptomsInput').value;
    const symptoms = symptomsInput.toLowerCase().split(/\s*,\s*|\s+/).map(s => s.trim());
    let results = [];

    showLoading();

    setTimeout(() => {

        diseases.forEach(disease => {
            let matchedSymptoms = disease.symptoms.filter(symptom =>
                symptoms.some(input => input.includes(symptom) || symptom.includes(input))
            );
            if (matchedSymptoms.length > 0) {
                results.push({
                    name: disease.name,
                    description: disease.description,
                    matchedSymptoms: matchedSymptoms.length,
                    severity: disease.severity,
                    emergencyTreatment: disease.emergencyTreatment,
                    treatmentMethod: disease.treatmentMethod,
                    specialist: disease.specialist,
                    source: disease.source,
                    features: disease.features,
                    symptoms: disease.symptoms,
                    medicineInfo: disease.medicineInfo,
                    warning: disease.warning
                });
            }
        });

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        if (results.length === 0) {
            resultDiv.innerHTML = 'Tidak ditemukan diagnosis. Silakan periksa gejala yang dimasukkan.';
            return;
        }

        results.sort((a, b) => b.matchedSymptoms - a.matchedSymptoms);

        // Menampilkan hasil paling akurat
        const mostAccurate = results[0];
        displayResult(mostAccurate, "Hasil Diagnosis Paling Akurat");

        // Menampilkan dua hasil kemungkinan lain
        results.slice(1, 3).forEach(result => {
            displayResult(result, "Kemungkinan Diagnosis Lain");
        });

        hideLoading(); // Sembunyikan spinner setelah hasil ditampilkan
    }, 1000); // Simulasi penundaan 1 detik
}

function displayResult(result, title) {
    const diseaseDiv = document.createElement('div');
    diseaseDiv.classList.add('disease');
    if (result.severity === 'serious') {
        diseaseDiv.classList.add('severity-serious');
    } else if (result.severity === 'moderate') {
        diseaseDiv.classList.add('severity-moderate');
    } else {
        diseaseDiv.classList.add('severity-mild');
    }

    diseaseDiv.innerHTML = `
        <h2>${title}: ${result.name}</h2>
        <p><strong>Deskripsi:</strong> ${result.description}</p>
        <p><strong>Gejala Cocok:</strong> ${result.matchedSymptoms}
        </p>
        <p><strong>Gejala :</strong> ${result.symptoms.join(', ')}</p>
        <p><strong>Tingkat Keparahan:</strong> ${result.severity}</p>
        <p><strong>Ciri-ciri :</strong> ${result.features.join(', ')}</p>
        <p><strong>Penanganan Darurat:</strong> ${result.emergencyTreatment}</p>
        <p><strong>Metode Pengobatan:</strong> ${result.treatmentMethod}</p>
        <p><strong>Spesialis:</strong> ${result.specialist}</p>
        <p><strong>Sumber:</strong> <a href="${result.source}" target="_blank">${result.source}</a></p>
        <p><strong>Obat yang Dianjurkan:</strong> ${result.medicineInfo}</p>
        <div class="warning">
            <p>${result.warning}</p>
        </div>
    `;
    document.getElementById('result').appendChild(diseaseDiv);
}


function resetForm() {
    // Kosongkan input
    document.getElementById('symptomsInput').value = '';
    // Kosongkan hasil diagnosis
    document.getElementById('result').innerHTML = '';
    // Fokuskan kembali ke input
    document.getElementById('symptomsInput').focus();
    // Scroll ke atas
    document.querySelector('.container').scrollTop = 0;
}

