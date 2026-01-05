// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    // Time Tools
    const dobInput = document.getElementById('dob');
    const calculateAgeBtn = document.getElementById('calculateAge');
    const ageResults = document.getElementById('age-results');
    
    const startDatetime = document.getElementById('start-datetime');
    const endDatetime = document.getElementById('end-datetime');
    const calculateDifferenceBtn = document.getElementById('calculateDifference');
    const differenceResults = document.getElementById('difference-results');
    
    const conversionType = document.getElementById('conversion-type');
    const fromValue = document.getElementById('from-value');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const toValue = document.getElementById('to-value');
    const convertUnitsBtn = document.getElementById('convertUnits');
    
    // Notepad
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const saveNoteBtn = document.getElementById('saveNote');
    const clearNoteBtn = document.getElementById('clearNote');
    const noteSearch = document.getElementById('note-search');
    const notesList = document.getElementById('notes-list');
    const noteId = document.getElementById('note-id');
    
    // Work File
    const workDate = document.getElementById('work-date');
    const workHours = document.getElementById('work-hours');
    const workTitle = document.getElementById('work-title');
    const workDescription = document.getElementById('work-description');
    const saveWorkBtn = document.getElementById('saveWork');
    const clearWorkBtn = document.getElementById('clearWork');
    const filterDate = document.getElementById('filter-date');
    const clearFilterBtn = document.getElementById('clearFilter');
    const worklogEntries = document.getElementById('worklog-entries');
    const workId = document.getElementById('work-id');
    
    // Salary Module
    const employeeName = document.getElementById('employee-name');
    const basicSalary = document.getElementById('basic-salary');
    const workingDays = document.getElementById('working-days');
    const overtimeHours = document.getElementById('overtime-hours');
    const overtimeRate = document.getElementById('overtime-rate');
    const bonus = document.getElementById('bonus');
    const deduction = document.getElementById('deduction');
    const salaryDate = document.getElementById('salary-date');
    const calculateSalaryBtn = document.getElementById('calculateSalary');
    const saveSalaryBtn = document.getElementById('saveSalary');
    const clearSalaryBtn = document.getElementById('clearSalary');
    const salaryHistory = document.getElementById('salary-history');
    
    // Modal
    const confirmationModal = document.getElementById('confirmationModal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalCancel = document.getElementById('modal-cancel');
    
    // Current date for max limit
    const today = new Date().toISOString().split('T')[0];
    dobInput.max = today;
    
    // Set default dates
    workDate.value = today;
    salaryDate.value = today;
    
    // Initialize the app
    initApp();
    
    // Initialize the application
    function initApp() {
        loadTheme();
        setupEventListeners();
        populateUnitSelects();
        loadNotes();
        loadWorkLogs();
        loadSalaryHistory();
        calculateDefaultSalary();
    }
    
    // Theme Management
    function loadTheme() {
        const savedTheme = localStorage.getItem('appTheme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        updateThemeToggleIcon(savedTheme);
    }
    
    function updateThemeToggleIcon(theme) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (theme === 'light') {
            moonIcon.style.opacity = '0.3';
            sunIcon.style.opacity = '1';
        } else {
            moonIcon.style.opacity = '1';
            sunIcon.style.opacity = '0.3';
        }
    }
    
    // Event Listeners Setup
    function setupEventListeners() {
        // Theme Toggle
        themeToggle.addEventListener('click', toggleTheme);
        
        // Navigation
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                switchSection(button.dataset.section);
            });
        });
        
        // Time Tools
        calculateAgeBtn.addEventListener('click', calculateAge);
        calculateDifferenceBtn.addEventListener('click', calculateTimeDifference);
        convertUnitsBtn.addEventListener('click', convertUnits);
        conversionType.addEventListener('change', populateUnitSelects);
        
        // Notepad
        saveNoteBtn.addEventListener('click', saveNote);
        clearNoteBtn.addEventListener('click', clearNoteForm);
        noteSearch.addEventListener('input', filterNotes);
        
        // Work File
        saveWorkBtn.addEventListener('click', saveWorkLog);
        clearWorkBtn.addEventListener('click', clearWorkForm);
        filterDate.addEventListener('change', filterWorkLogs);
        clearFilterBtn.addEventListener('click', clearWorkFilter);
        
        // Salary Module
        calculateSalaryBtn.addEventListener('click', calculateSalary);
        saveSalaryBtn.addEventListener('click', saveSalaryRecord);
        clearSalaryBtn.addEventListener('click', clearSalaryForm);
        
        // Modal
        modalCancel.addEventListener('click', closeModal);
        
        // Input changes for live calculations
        const salaryInputs = [basicSalary, workingDays, overtimeHours, overtimeRate, bonus, deduction];
        salaryInputs.forEach(input => {
            input.addEventListener('input', calculateSalary);
        });
        
        // Unit conversion on input change
        fromValue.addEventListener('input', convertUnits);
        fromUnit.addEventListener('change', convertUnits);
        toUnit.addEventListener('change', convertUnits);
    }
    
    // Theme Toggle Function
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('appTheme', newTheme);
        updateThemeToggleIcon(newTheme);
    }
    
    // Section Switching
    function switchSection(sectionId) {
        // Update active nav button
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
        
        // Show selected section, hide others
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        // Scroll to top of section
        document.querySelector('.main-content').scrollTop = 0;
    }
    
    // Time Tools Functions
    function calculateAge() {
        const dob = new Date(dobInput.value);
        const today = new Date();
        
        if (dobInput.value === '' || dob > today) {
            showError(dobInput, 'Please enter a valid date of birth');
            return;
        }
        
        clearError(dobInput);
        
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
        
        if (days < 0) {
            months--;
            // Get days in previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Calculate total days
        const timeDiff = today.getTime() - dob.getTime();
        const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Update UI
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('total-days').textContent = totalDays;
        
        ageResults.classList.add('show');
    }
    
    function calculateTimeDifference() {
        const start = new Date(startDatetime.value);
        const end = new Date(endDatetime.value);
        
        if (!startDatetime.value || !endDatetime.value || start >= end) {
            alert('Please enter valid start and end dates/times');
            return;
        }
        
        const diffMs = end.getTime() - start.getTime();
        
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        const remainingHours = diffHours % 24;
        const remainingMinutes = diffMinutes % 60;
        const remainingSeconds = diffSeconds % 60;
        
        // Update UI
        document.getElementById('diff-days').textContent = diffDays;
        document.getElementById('diff-hours').textContent = remainingHours;
        document.getElementById('diff-minutes').textContent = remainingMinutes;
        document.getElementById('diff-seconds').textContent = remainingSeconds;
        
        differenceResults.classList.add('show');
    }
    
    function populateUnitSelects() {
        const type = conversionType.value;
        let fromUnits = [];
        let toUnits = [];
        
        switch(type) {
            case 'length':
                fromUnits = ['meters', 'kilometers', 'centimeters'];
                toUnits = ['meters', 'kilometers', 'centimeters'];
                break;
            case 'weight':
                fromUnits = ['kilograms', 'grams'];
                toUnits = ['kilograms', 'grams'];
                break;
            case 'time':
                fromUnits = ['seconds', 'minutes', 'hours'];
                toUnits = ['seconds', 'minutes', 'hours'];
                break;
        }
        
        populateSelect(fromUnit, fromUnits);
        populateSelect(toUnit, toUnits);
        
        // Trigger conversion if there's a value
        if (fromValue.value) {
            convertUnits();
        }
    }
    
    function populateSelect(selectElement, options) {
        selectElement.innerHTML = '';
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option.charAt(0).toUpperCase() + option.slice(1);
            selectElement.appendChild(opt);
        });
    }
    
    function convertUnits() {
        const value = parseFloat(fromValue.value);
        if (isNaN(value) || value < 0) {
            toValue.value = '';
            return;
        }
        
        const from = fromUnit.value;
        const to = toUnit.value;
        const type = conversionType.value;
        
        let result = value;
        
        // Convert to base unit first
        switch(type) {
            case 'length':
                result = convertToMeters(value, from);
                result = convertFromMeters(result, to);
                break;
            case 'weight':
                result = convertToKilograms(value, from);
                result = convertFromKilograms(result, to);
                break;
            case 'time':
                result = convertToSeconds(value, from);
                result = convertFromSeconds(result, to);
                break;
        }
        
        toValue.value = result.toFixed(4);
    }
    
    // Conversion helper functions
    function convertToMeters(value, unit) {
        switch(unit) {
            case 'kilometers': return value * 1000;
            case 'centimeters': return value / 100;
            default: return value; // meters
        }
    }
    
    function convertFromMeters(value, unit) {
        switch(unit) {
            case 'kilometers': return value / 1000;
            case 'centimeters': return value * 100;
            default: return value; // meters
        }
    }
    
    function convertToKilograms(value, unit) {
        switch(unit) {
            case 'grams': return value / 1000;
            default: return value; // kilograms
        }
    }
    
    function convertFromKilograms(value, unit) {
        switch(unit) {
            case 'grams': return value * 1000;
            default: return value; // kilograms
        }
    }
    
    function convertToSeconds(value, unit) {
        switch(unit) {
            case 'minutes': return value * 60;
            case 'hours': return value * 3600;
            default: return value; // seconds
        }
    }
    function convertFromSeconds(value, unit) {
        switch(unit) {
            case 'minutes': return value / 60;
            case 'hours': return value / 3600;
            default: return value; // seconds
        }
    }
    
    // Notepad Functions
    function saveNote() {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        const id = noteId.value || Date.now().toString();
        
        if (!title || !content) {
            alert('Please enter both title and content');
            return;
        }
        
        const notes = getNotes();
        const noteIndex = notes.findIndex(note => note.id === id);
        const now = new Date();
        
        const note = {
            id,
            title,
            content,
            created: noteIndex >= 0 ? notes[noteIndex].created : now.toISOString(),
            updated: now.toISOString()
        };
        
        if (noteIndex >= 0) {
            notes[noteIndex] = note;
        } else {
            notes.unshift(note);
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        clearNoteForm();
        
        // Show success feedback
        const saveBtn = saveNoteBtn.querySelector('i');
        const originalClass = saveBtn.className;
        saveBtn.className = 'fas fa-check';
        setTimeout(() => {
            saveBtn.className = originalClass;
        }, 1000);
    }
    
    function getNotes() {
        return JSON.parse(localStorage.getItem('notes') || '[]');
    }
    
    function loadNotes(filter = '') {
        const notes = getNotes();
        notesList.innerHTML = '';
        
        const filteredNotes = filter ? 
            notes.filter(note => 
                note.title.toLowerCase().includes(filter.toLowerCase()) || 
                note.content.toLowerCase().includes(filter.toLowerCase())
            ) : notes;
        
        if (filteredNotes.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-notes';
            emptyDiv.innerHTML = `
                <i class="fas fa-sticky-note"></i>
                <p>${filter ? 'No notes match your search' : 'No notes yet. Create your first note!'}</p>
            `;
            notesList.appendChild(emptyDiv);
            return;
        }
        
        filteredNotes.forEach(note => {
            const noteCard = createNoteCard(note);
            notesList.appendChild(noteCard);
        });
    }
    
    function createNoteCard(note) {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.dataset.id = note.id;
        
        const date = new Date(note.updated);
        const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        card.innerHTML = `
            <div class="note-header">
                <div class="note-title">${escapeHtml(note.title)}</div>
                <div class="note-date">${dateStr}</div>
            </div>
            <div class="note-content-preview">${escapeHtml(note.content.substring(0, 100))}${note.content.length > 100 ? '...' : ''}</div>
            <div class="note-actions-row">
                <button class="note-action-btn edit" title="Edit note">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="note-action-btn delete" title="Delete note">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Add event listeners
        card.querySelector('.edit').addEventListener('click', (e) => {
            e.stopPropagation();
            editNote(note.id);
        });
        
        card.querySelector('.delete').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteNote(note.id);
        });
        
        card.addEventListener('click', () => {
            viewNote(note.id);
        });
        
        return card;
    }
    
    function editNote(id) {
        const notes = getNotes();
        const note = notes.find(n => n.id === id);
        
        if (note) {
            noteTitle.value = note.title;
            noteContent.value = note.content;
            noteId.value = note.id;
            
            // Scroll to editor
            document.getElementById('note-title').focus();
            
            // Switch to notepad section if not already
            switchSection('notepad');
        }
    }
    
    function viewNote(id) {
        const notes = getNotes();
        const note = notes.find(n => n.id === id);
        
        if (note) {
            openModal(
                escapeHtml(note.title),
                `<div style="margin-bottom: 15px; color: var(--text-secondary); font-size: 0.9rem;">
                    Created: ${new Date(note.created).toLocaleString()}<br>
                    Updated: ${new Date(note.updated).toLocaleString()}
                </div>
                <div style="white-space: pre-wrap; line-height: 1.5;">${escapeHtml(note.content)}</div>`,
                'Close',
                () => closeModal(),
                false
            );
        }
    }
    
    function deleteNote(id) {
        openModal(
            'Delete Note',
            'Are you sure you want to delete this note? This action cannot be undone.',
            'Delete',
            () => {
                const notes = getNotes();
                const filteredNotes = notes.filter(note => note.id !== id);
                localStorage.setItem('notes', JSON.stringify(filteredNotes));
                loadNotes(noteSearch.value);
                closeModal();
                
                // Clear form if editing this note
                if (noteId.value === id) {
                    clearNoteForm();
                }
            }
        );
    }
    
    function filterNotes() {
        loadNotes(noteSearch.value);
    }
    
    function clearNoteForm() {
        noteTitle.value = '';
        noteContent.value = '';
        noteId.value = '';
    }
    
    // Work File Functions
    function saveWorkLog() {
        const date = workDate.value;
        const hours = parseFloat(workHours.value);
        const title = workTitle.value.trim();
        const description = workDescription.value.trim();
        const id = workId.value || Date.now().toString();
        
        if (!date || !title || isNaN(hours) || hours <= 0) {
            alert('Please fill all required fields with valid values');
            return;
        }
        
        const workLogs = getWorkLogs();
        const logIndex = workLogs.findIndex(log => log.id === id);
        
        const log = {
            id,
            date,
            hours,
            title,
            description,
            created: logIndex >= 0 ? workLogs[logIndex].created : new Date().toISOString()
        };
        
        if (logIndex >= 0) {
            workLogs[logIndex] = log;
        } else {
            workLogs.unshift(log);
        }
        
        localStorage.setItem('workLogs', JSON.stringify(workLogs));
        loadWorkLogs();
        clearWorkForm();
        
        // Show success feedback
        const saveBtn = saveWorkBtn.querySelector('i');
        const originalClass = saveBtn.className;
        saveBtn.className = 'fas fa-check';
        setTimeout(() => {
            saveBtn.className = originalClass;
        }, 1000);
    }
    
    function getWorkLogs() {
        return JSON.parse(localStorage.getItem('workLogs') || '[]');
    }
    
    function loadWorkLogs(filterDateValue = '') {
        const workLogs = getWorkLogs();
        worklogEntries.innerHTML = '';
        
        const filteredLogs = filterDateValue ? 
            workLogs.filter(log => log.date === filterDateValue) : 
            workLogs;
        
        if (filteredLogs.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.className = 'empty-row';
            emptyRow.innerHTML = `<td colspan="4">${filterDateValue ? 'No work logs for this date' : 'No work logs yet. Add your first entry!'}</td>`;
            worklogEntries.appendChild(emptyRow);
            return;
        }
        
        filteredLogs.forEach(log => {
            const row = createWorkLogRow(log);
            worklogEntries.appendChild(row);
        });
    }
    function createWorkLogRow(log) {
        const row = document.createElement('tr');
        row.dataset.id = log.id;
        
        row.innerHTML = `
            <td>${log.date}</td>
            <td>${escapeHtml(log.title)}</td>
            <td>${log.hours} hrs</td>
            <td class="actions-cell">
                <button class="table-action-btn edit" title="Edit entry">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="table-action-btn delete" title="Delete entry">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        row.querySelector('.edit').addEventListener('click', () => {
            editWorkLog(log.id);
        });
        
        row.querySelector('.delete').addEventListener('click', () => {
            deleteWorkLog(log.id);
        });
        
        return row;
    }
    
    function editWorkLog(id) {
        const workLogs = getWorkLogs();
        const log = workLogs.find(l => l.id === id);
        
        if (log) {
            workDate.value = log.date;
            workHours.value = log.hours;
            workTitle.value = log.title;
            workDescription.value = log.description;
            workId.value = log.id;
            
            // Scroll to form
            document.getElementById('work-date').focus();
            
            // Switch to work file section if not already
            switchSection('work-file');
        }
    }
    
    function deleteWorkLog(id) {
        openModal(
            'Delete Work Log',
            'Are you sure you want to delete this work log? This action cannot be undone.',
            'Delete',
            () => {
                const workLogs = getWorkLogs();
                const filteredLogs = workLogs.filter(log => log.id !== id);
                localStorage.setItem('workLogs', JSON.stringify(filteredLogs));
                loadWorkLogs(filterDate.value);
                closeModal();
                
                // Clear form if editing this log
                if (workId.value === id) {
                    clearWorkForm();
                }
            }
        );
    }
    
    function filterWorkLogs() {
        loadWorkLogs(filterDate.value);
          }
  function clearWorkFilter() {
        filterDate.value = '';
        loadWorkLogs();
    }
    
    function clearWorkForm() {
        workDate.value = today;
        workHours.value = '';
        workTitle.value = '';
        workDescription.value = '';
        workId.value = '';
    }
    
    // Salary Module Functions
    function calculateSalary() {
        const basic = parseFloat(basicSalary.value) || 0;
        const days = parseFloat(workingDays.value) || 0;
        const overtimeHrs = parseFloat(overtimeHours.value) || 0;
        const rate = parseFloat(overtimeRate.value) || 0;
        const bonusAmt = parseFloat(bonus.value) || 0;
        const deductionAmt = parseFloat(deduction.value) || 0;
        
        const overtimePay = overtimeHrs * rate;
        const gross = basic + overtimePay + bonusAmt;
        const net = gross - deductionAmt;
        
        // Update UI
        document.getElementById('breakdown-basic').textContent = `$${basic.toFixed(2)}`;
        document.getElementById('breakdown-overtime').textContent = `$${overtimePay.toFixed(2)}`;
        document.getElementById('breakdown-bonus').textContent = `$${bonusAmt.toFixed(2)}`;
        document.getElementById('breakdown-deduction').textContent = `$${deductionAmt.toFixed(2)}`;
        document.getElementById('breakdown-gross').textContent = `$${gross.toFixed(2)}`;
        document.getElementById('breakdown-net').textContent = `$${net.toFixed(2)}`;
    }
    
    function calculateDefaultSalary() {
        // Set some default values for demonstration
        if (!basicSalary.value) basicSalary.value = '3000';
        if (!workingDays.value) workingDays.value = '22';
        if (!overtimeRate.value) overtimeRate.value = '20';
        
        calculateSalary();
    }
    
    function saveSalaryRecord() {
        const name = employeeName.value.trim();
        const basic = parseFloat(basicSalary.value) || 0;
        const days = parseFloat(workingDays.value) || 0;
        const overtimeHrs = parseFloat(overtimeHours.value) || 0;
        const rate = parseFloat(overtimeRate.value) || 0;
        const bonusAmt = parseFloat(bonus.value) || 0;
        const deductionAmt = parseFloat(deduction.value) || 0;
        const date = salaryDate.value;
        
        if (!name || !date) {
            alert('Please enter employee name and salary date');
            return;
        }
        
        const overtimePay = overtimeHrs * rate;
        const gross = basic + overtimePay + bonusAmt;
        const net = gross - deductionAmt;
        
        const salaryRecords = getSalaryRecords();
        const id = Date.now().toString();
        
        const record = {
            id,
            name,
            date,
            basic,
            days,
            overtimeHrs,
            rate,
            overtimePay,
            bonusAmt,
            deductionAmt,
            gross,
            net,
            created: new Date().toISOString()
        };
        
        salaryRecords.unshift(record);
        localStorage.setItem('salaryRecords', JSON.stringify(salaryRecords));
        loadSalaryHistory();
        
        // Show success feedback
        const saveBtn = saveSalaryBtn.querySelector('i');
        const originalClass = saveBtn.className;
        saveBtn.className = 'fas fa-check';
        setTimeout(() => {
            saveBtn.className = originalClass;
        }, 1000);
    }
    
    function getSalaryRecords() {
        return JSON.parse(localStorage.getItem('salaryRecords') || '[]');
    }
    
    function loadSalaryHistory() {
        const records = getSalaryRecords();
        salaryHistory.innerHTML = '';
        
        if (records.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-history';
            emptyDiv.innerHTML = `
                <i class="fas fa-history"></i>
                <p>No salary records yet</p>
            `;
            salaryHistory.appendChild(emptyDiv);
            return;
        }
        
        records.forEach(record => {
            const recordCard = createSalaryRecordCard(record);
            salaryHistory.appendChild(recordCard);
        });
    }
    function createSalaryRecordCard(record) {
        const card = document.createElement('div');
        card.className = 'salary-record';
        card.dataset.id = record.id;
        
        const date = new Date(record.date);
        const dateStr = date.toLocaleDateString();
        
        card.innerHTML = `
            <div class="record-header">
                <div class="record-name">${escapeHtml(record.name)}</div>
                <div class="record-date">${dateStr}</div>
            </div>
            <div class="record-details">
                <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 5px;">
                    Basic: $${record.basic.toFixed(2)} | Days: ${record.days} | OT: ${record.overtimeHrs} hrs
                </div>
                <div class="record-amount">$${record.net.toFixed(2)}</div>
            </div>
            <div class="record-actions">
                <button class="table-action-btn delete" title="Delete record">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
            `;
        
        card.querySelector('.delete').addEventListener('click', () => {
            deleteSalaryRecord(record.id);
        });
        
        // Click to view details
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.record-actions')) {
                viewSalaryRecord(record);
            }
        });
        
        return card;
    }
    
    function viewSalaryRecord(record) {
        const date = new Date(record.date);
        const dateStr = date.toLocaleDateString();
        
        openModal(
            `Salary Details - ${escapeHtml(record.name)}`,
            `<div style="margin-bottom: 15px; color: var(--text-secondary);">
                <strong>Date:</strong> ${dateStr}<br>
                <strong>Working Days:</strong> ${record.days}
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Basic Salary:</span>
                    <span>$${record.basic.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Overtime Pay (${record.overtimeHrs} hrs × $${record.rate}/hr):</span>
                    <span>$${record.overtimePay.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Bonus:</span>
                    <span>$${record.bonusAmt.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span>Deduction:</span>
                    <span>$${record.deductionAmt.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 8px;">
                    <span>Gross Salary:</span>
                    <span>$${record.gross.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; color: var(--success-color); font-size: 1.1rem;">
                    <span>Net Salary:</span>
                    <span>$${record.net.toFixed(2)}</span>
                </div>
            </div>`,
            'Close',
            () => closeModal(),
            false
        );
    }
    
    function deleteSalaryRecord(id) {
        openModal(
            'Delete Salary Record',
            'Are you sure you want to delete this salary record? This action cannot be undone.',
            'Delete',
            () => {
                const records = getSalaryRecords();
                const filteredRecords = records.filter(record => record.id !== id);
                localStorage.setItem('salaryRecords', JSON.stringify(filteredRecords));
                loadSalaryHistory();
                closeModal();
            }
        );
    }
    
    function clearSalaryForm() {
        employeeName.value = '';
        basicSalary.value = '';
        workingDays.value = '';
        overtimeHours.value = '';
        overtimeRate.value = '';
        bonus.value = '';
        deduction.value = '';
        salaryDate.value = today;
        
        // Reset to defaults
        calculateDefaultSalary();
    }
    
    // Modal Functions
    function openModal(title, message, confirmText, confirmAction, showCancel = true) {
        modalTitle.textContent = title;
        modalMessage.innerHTML = message;
        modalConfirm.textContent = confirmText;
        
        modalConfirm.onclick = () => {
            confirmAction();
        };
        
        if (!showCancel) {
            modalCancel.style.display = 'none';
        } else {
            modalCancel.style.display = 'block';
        }
        
        confirmationModal.classList.add('active');
    }
    
    function closeModal() {
        confirmationModal.classList.remove('active');
    }
    
    // Utility Functions
    function showError(inputElement, message) {
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        errorElement.textContent = message;
        inputElement.style.borderColor = 'var(--danger-color)';
    }
    
    function clearError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
        inputElement.style.borderColor = '';
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
