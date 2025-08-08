// Digital Electronics Course Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when DOM is loaded
    initNavigation();
    initReferenceMaterials();
    initAttendanceUpload();
    initAssignments();
    initAnimations();
    initProfessorCard();
    initFooter();
    initAccessibility();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 70;
                const offsetTop = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
                
                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });
    
    // Update active navigation on scroll with throttling
    let ticking = false;
    function updateNavigationOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        let activeSection = null;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                activeSection = id;
            }
        });
        
        if (activeSection) {
            const activeLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
            if (activeLink) {
                updateActiveNavLink(activeLink);
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavigationOnScroll);
            ticking = true;
        }
    });
}

function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Reference materials functionality
function initReferenceMaterials() {
    // Reference materials data
    const referenceData = {
        'fundamentals': {
            title: 'Digital Fundamentals & Number Systems',
            links: [
                {
                    name: 'Digital Logic Design by Morris Mano',
                    url: 'https://www.pearson.com/us/higher-education/program/Mano-Digital-Logic-and-Computer-Design/PGM213749.html',
                    description: 'Comprehensive textbook covering digital logic fundamentals'
                },
                {
                    name: 'Number Systems Tutorial - GeeksforGeeks',
                    url: 'https://www.geeksforgeeks.org/number-system-and-base-conversions/',
                    description: 'Interactive tutorial on number system conversions'
                },
                {
                    name: 'Binary Arithmetic - Khan Academy',
                    url: 'https://www.khanacademy.org/computing/computer-science/how-computers-work2/v/khan-academy-and-codeorg-binary-data',
                    description: 'Visual explanation of binary number system'
                },
                {
                    name: 'Digital vs Analog Signals',
                    url: 'https://www.electronics-tutorials.ws/io/input-interfacing-circuits.html',
                    description: 'Understanding the difference between digital and analog signals'
                }
            ]
        },
        'boolean': {
            title: 'Logic Gates & Boolean Algebra',
            links: [
                {
                    name: 'Boolean Algebra Laws and Theorems',
                    url: 'https://www.electronics-tutorials.ws/boolean/bool_6.html',
                    description: 'Complete guide to Boolean algebra laws and DeMorgan\'s theorems'
                },
                {
                    name: 'Logic Gates Simulator',
                    url: 'https://logic.ly/demo/',
                    description: 'Interactive logic gate simulator for hands-on practice'
                },
                {
                    name: 'Universal Gates Explained',
                    url: 'https://www.geeksforgeeks.org/universal-gates-in-digital-logic/',
                    description: 'Understanding NAND and NOR as universal gates'
                },
                {
                    name: 'Circuit Verse - Online Digital Circuit Simulator',
                    url: 'https://circuitverse.org/',
                    description: 'Free online digital logic simulator'
                }
            ]
        },
        'combinational': {
            title: 'Combinational Logic Design',
            links: [
                {
                    name: 'Karnaugh Maps Tutorial',
                    url: 'https://www.electronics-tutorials.ws/combination/comb_4.html',
                    description: 'Step-by-step guide to K-map simplification'
                },
                {
                    name: 'Adder Circuits Design',
                    url: 'https://www.geeksforgeeks.org/half-adder-and-full-adder/',
                    description: 'Design and implementation of half and full adders'
                },
                {
                    name: 'Multiplexer and Demultiplexer',
                    url: 'https://www.electronics-tutorials.ws/combination/comb_2.html',
                    description: 'Understanding MUX and DEMUX circuits'
                },
                {
                    name: 'Encoder and Decoder Circuits',
                    url: 'https://www.geeksforgeeks.org/digital-electronics-encoders-decoders/',
                    description: 'Comprehensive guide to encoders and decoders'
                }
            ]
        },
        'sequential': {
            title: 'Sequential Logic & Flip-Flops',
            links: [
                {
                    name: 'Flip-Flops and Latches',
                    url: 'https://www.electronics-tutorials.ws/sequential/seq_1.html',
                    description: 'Understanding the difference between latches and flip-flops'
                },
                {
                    name: 'Edge vs Level Triggering',
                    url: 'https://www.geeksforgeeks.org/latches-in-digital-logic/',
                    description: 'Clock triggering mechanisms in sequential circuits'
                },
                {
                    name: '555 Timer IC Tutorial',
                    url: 'https://www.electronics-tutorials.ws/waveforms/555_timer.html',
                    description: 'Complete guide to 555 timer applications'
                },
                {
                    name: 'JK Flip-Flop Applications',
                    url: 'https://www.electronics-tutorials.ws/sequential/seq_2.html',
                    description: 'Practical applications of JK flip-flops'
                }
            ]
        },
        'registers': {
            title: 'Registers & Counters',
            links: [
                {
                    name: 'Shift Register Types',
                    url: 'https://www.electronics-tutorials.ws/sequential/seq_5.html',
                    description: 'SISO, SIPO, PISO, PIPO shift registers'
                },
                {
                    name: 'Counter Design Tutorial',
                    url: 'https://www.geeksforgeeks.org/counters-in-digital-logic/',
                    description: 'Synchronous and asynchronous counter design'
                },
                {
                    name: 'Decade Counter (BCD Counter)',
                    url: 'https://www.electronics-tutorials.ws/counter/count_3.html',
                    description: 'Design and applications of decade counters'
                },
                {
                    name: 'Johnson Counter Ring Counter',
                    url: 'https://www.electronics-tutorials.ws/sequential/seq_6.html',
                    description: 'Ring and Johnson counter implementations'
                }
            ]
        },
        'architecture': {
            title: 'Computer Architecture Basics',
            links: [
                {
                    name: 'von Neumann Architecture',
                    url: 'https://www.geeksforgeeks.org/computer-organization-von-neumann-architecture/',
                    description: 'Understanding the von Neumann computer model'
                },
                {
                    name: 'CPU Architecture Fundamentals',
                    url: 'https://www.tutorialspoint.com/computer_logical_organization/computer_arithmetic.htm',
                    description: 'Basic CPU components and operations'
                },
                {
                    name: 'Memory Organization',
                    url: 'https://www.geeksforgeeks.org/memory-organization-in-computer-architecture/',
                    description: 'Memory hierarchy and organization'
                },
                {
                    name: 'Microprocessor vs Microcontroller',
                    url: 'https://www.geeksforgeeks.org/difference-between-microprocessor-and-microcontroller/',
                    description: 'Key differences and applications'
                }
            ]
        },
        'verilog': {
            title: 'Verilog Programming Fundamentals',
            links: [
                {
                    name: 'Verilog Tutorial for Beginners',
                    url: 'https://www.asic-world.com/verilog/veritut.html',
                    description: 'Complete Verilog tutorial from basics to advanced'
                },
                {
                    name: 'HDL Bits - Verilog Practice',
                    url: 'https://hdlbits.01xz.net/wiki/Main_Page',
                    description: 'Interactive Verilog coding exercises'
                },
                {
                    name: 'EDA Playground - Online Verilog Simulator',
                    url: 'https://www.edaplayground.com/',
                    description: 'Free online Verilog simulation environment'
                },
                {
                    name: 'Verilog Module Design Guidelines',
                    url: 'https://www.chipverify.com/verilog/verilog-modules',
                    description: 'Best practices for Verilog module design'
                }
            ]
        },
        'simulation': {
            title: 'Digital Circuit Simulation',
            links: [
                {
                    name: 'ModelSim Tutorial',
                    url: 'https://www.microsemi.com/document-portal/doc_download/136364-modelsim-tutorial-pdf',
                    description: 'Professional VHDL/Verilog simulation tool tutorial'
                },
                {
                    name: 'Timing Analysis in Digital Circuits',
                    url: 'https://www.allaboutcircuits.com/technical-articles/timing-analysis-in-digital-circuits/',
                    description: 'Understanding setup and hold times'
                },
                {
                    name: 'Testbench Writing Guidelines',
                    url: 'https://www.chipverify.com/verilog/verilog-testbench',
                    description: 'How to write effective testbenches'
                },
                {
                    name: 'Logic Simulation Best Practices',
                    url: 'https://www.design-reuse.com/articles/25476/logic-simulation-best-practices.html',
                    description: 'Professional simulation methodologies'
                }
            ]
        }
    };

    // Add event listeners to reference buttons - handle both onclick and direct event listeners
    const referenceButtons = document.querySelectorAll('button[onclick*="showReferences"], .btn[onclick*="showReferences"]');
    referenceButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr) {
            const topicMatch = onclickAttr.match(/showReferences\('([^']+)'\)/);
            if (topicMatch) {
                const topic = topicMatch[1];
                button.removeAttribute('onclick');
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    showReferences(topic);
                });
            }
        }
    });
    
    // Define showReferences function
    function showReferences(topic) {
        const data = referenceData[topic];
        if (!data) {
            showAlert('Reference materials will be available soon!', 'info');
            return;
        }

        const modalElement = document.getElementById('referenceModal');
        if (!modalElement) {
            console.error('Reference modal not found');
            return;
        }
        
        const modalTitle = modalElement.querySelector('.modal-title');
        const modalBody = modalElement.querySelector('#referenceContent');
        
        if (modalTitle) modalTitle.textContent = data.title + ' - Reference Materials';
        
        let content = '<div class="reference-links">';
        data.links.forEach(link => {
            content += `
                <div class="reference-item mb-3 p-3 border rounded">
                    <h6><a href="${link.url}" target="_blank" class="text-decoration-none">
                        <i class="fas fa-external-link-alt me-2"></i>${link.name}
                    </a></h6>
                    <p class="text-muted mb-0">${link.description}</p>
                </div>
            `;
        });
        content += '</div>';
        
        if (modalBody) modalBody.innerHTML = content;
        
        // Use Bootstrap modal
        try {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } catch (error) {
            console.error('Error showing modal:', error);
            showAlert('Reference materials modal could not be opened. Please try again.', 'warning');
        }
    }

    // Make showReferences function globally available
    window.showReferences = showReferences;
}

// Attendance upload functionality
function initAttendanceUpload() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xlsx,.xls,.csv';
        fileInput.style.display = 'none';
        area.appendChild(fileInput);
        
        const button = area.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                fileInput.click();
            });
        }
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file, area);
            }
        });
        
        // Drag and drop functionality
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            area.classList.add('drag-over');
        });
        
        area.addEventListener('dragleave', function(e) {
            e.preventDefault();
            area.classList.remove('drag-over');
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            area.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
                    handleFileUpload(file, area);
                } else {
                    showAlert('Please upload a valid Excel or CSV file.', 'warning');
                }
            }
        });
    });
}

function handleFileUpload(file, area) {
    // Show loading state
    area.innerHTML = `
        <div class="text-center p-4">
            <div class="spinner-border text-primary mb-3" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <h5>Processing ${file.name}...</h5>
            <p class="text-muted">Please wait while we process your attendance file</p>
        </div>
    `;
    
    // Simulate file processing (replace with actual upload logic)
    setTimeout(() => {
        area.innerHTML = `
            <div class="text-center p-4 text-success">
                <i class="fas fa-check-circle fa-3x mb-3"></i>
                <h5>File Uploaded Successfully!</h5>
                <p class="text-muted">File: ${file.name}</p>
                <p class="text-muted">Size: ${(file.size / 1024).toFixed(2)} KB</p>
                <button class="btn btn-outline-primary btn-sm" onclick="resetUploadArea(this)">Upload Another File</button>
            </div>
        `;
        
        showAlert('Attendance file uploaded successfully! Data will be processed shortly.', 'success');
    }, 2000);
}

function resetUploadArea(button) {
    const area = button.closest('.upload-area');
    const tabPane = area.closest('.tab-pane');
    const month = tabPane.id;
    const monthName = month.charAt(0).toUpperCase() + month.slice(1) + ' 2025';
    
    area.innerHTML = `
        <i class="fas fa-upload fa-3x text-muted mb-3"></i>
        <h5>Upload ${monthName} Attendance Report</h5>
        <p class="text-muted">Drag and drop your Excel file or click to browse</p>
        <button class="btn btn-primary">Choose File</button>
    `;
    
    // Re-initialize the upload functionality for this area
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv';
    fileInput.style.display = 'none';
    area.appendChild(fileInput);
    
    const newButton = area.querySelector('.btn');
    if (newButton) {
        newButton.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file, area);
            }
        });
    }
}

// Assignment functionality
function initAssignments() {
    const assignmentButtons = document.querySelectorAll('.assignment-card .btn-outline-primary');
    
    assignmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.assignment-card');
            const title = card.querySelector('h5') ? card.querySelector('h5').textContent : 'Assignment';
            const type = card.querySelector('.assignment-type') ? card.querySelector('.assignment-type').textContent : 'Assignment';
            
            showAssignmentDetails(title, type);
        });
    });
}

function showAssignmentDetails(title, type) {
    const detailsModal = createModal('Assignment Details', getAssignmentDetails(title, type));
    detailsModal.show();
}

function getAssignmentDetails(title, type) {
    const assignments = {
        'Emerging Technologies in Digital Electronics': {
            overview: 'Research and present on cutting-edge technologies in digital electronics field.',
            objectives: [
                'Understand current trends in digital electronics',
                'Develop research and presentation skills',
                'Explore practical applications of emerging technologies'
            ],
            requirements: [
                'Choose from provided list of topics or propose your own',
                'Minimum 10 academic references',
                '15-20 slides presentation',
                'Live demonstration if applicable'
            ],
            evaluation: [
                'Content Quality (40%)',
                'Presentation Skills (30%)',
                'Research Depth (20%)',
                'Q&A Handling (10%)'
            ],
            timeline: 'Assignment will be announced in Week 3. Submission deadline: Week 8'
        },
        'Digital Logic Fundamentals Quiz': {
            overview: 'Comprehensive online quiz covering Units 1-2 concepts.',
            objectives: [
                'Assess understanding of number systems',
                'Evaluate knowledge of logic gates',
                'Test combinational logic design skills'
            ],
            requirements: [
                'Complete quiz within 60-minute time limit',
                'Multiple choice and short answer questions',
                'No negative marking',
                'Single attempt only'
            ],
            evaluation: [
                'Number Systems (25%)',
                'Logic Gates (25%)',
                'Boolean Algebra (25%)',
                'Combinational Circuits (25%)'
            ],
            timeline: 'Quiz will be available after Unit 2 completion. Duration: 3 days window'
        },
        'Future of Digital Electronics: Hardware vs Software Solutions': {
            overview: 'Team-based debate on the role of hardware vs software in future technologies.',
            objectives: [
                'Develop critical thinking skills',
                'Understand trade-offs in system design',
                'Improve communication and argumentation abilities'
            ],
            requirements: [
                'Teams of 4-5 students',
                'Position papers due before debate',
                'Use of technical evidence and examples',
                'Respectful and constructive discussion'
            ],
            evaluation: [
                'Argument Quality (35%)',
                'Evidence and Examples (25%)',
                'Team Coordination (20%)',
                'Rebuttal Skills (20%)'
            ],
            timeline: 'Teams formed in Week 5. Debate scheduled for Week 10'
        },
        'Verilog Design Project': {
            overview: 'Design and implement a complete digital system using Verilog HDL.',
            objectives: [
                'Apply digital design concepts practically',
                'Learn hardware description language',
                'Develop verification and testing skills'
            ],
            requirements: [
                'Choose from provided project list or propose custom project',
                'Complete Verilog implementation',
                'Comprehensive testbench',
                'Design documentation and report'
            ],
            evaluation: [
                'Design Correctness (30%)',
                'Code Quality (25%)',
                'Testing Thoroughness (25%)',
                'Documentation (20%)'
            ],
            timeline: 'Project selection by Week 6. Final submission: End of semester'
        }
    };
    
    const assignment = assignments[title];
    if (!assignment) return '<p>Assignment details will be updated soon.</p>';
    
    return `
        <div class="assignment-details-content">
            <div class="mb-4">
                <h6 class="text-primary">Overview</h6>
                <p>${assignment.overview}</p>
            </div>
            
            <div class="mb-4">
                <h6 class="text-primary">Learning Objectives</h6>
                <ul>
                    ${assignment.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
            
            <div class="mb-4">
                <h6 class="text-primary">Requirements</h6>
                <ul>
                    ${assignment.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            
            <div class="mb-4">
                <h6 class="text-primary">Evaluation Criteria</h6>
                <ul>
                    ${assignment.evaluation.map(eval => `<li>${eval}</li>`).join('')}
                </ul>
            </div>
            
            <div class="mb-4">
                <h6 class="text-primary">Timeline</h6>
                <p>${assignment.timeline}</p>
            </div>
            
            <div class="alert alert-info">
                <i class="fas fa-info-circle me-2"></i>
                Detailed assignment instructions and submission guidelines will be provided when the assignment is officially announced.
            </div>
        </div>
    `;
}

// Animation and visual effects
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with delay
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.stat-card, .material-card, .assignment-card, .practical-card, .professor-card');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }, 100);
}

// Professor card interaction
function initProfessorCard() {
    const professorCard = document.querySelector('.professor-card');
    if (professorCard) {
        professorCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 25px 50px rgba(33, 128, 141, 0.2)';
        });
        
        professorCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        // Add click effect for professor email
        const emailLink = professorCard.querySelector('a[href^="mailto:"]');
        if (emailLink) {
            emailLink.addEventListener('click', function(e) {
                showAlert('Opening email client to contact Prof. Mohd. Iqbal Bhat...', 'info');
            });
        }
    }
}

// Footer interactions
function initFooter() {
    const footerLinks = document.querySelectorAll('.footer-quick-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 70;
                const offsetTop = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced accessibility features
function initAccessibility() {
    // Add keyboard navigation support for cards
    const interactiveCards = document.querySelectorAll('.material-card, .assignment-card, .professor-card');
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = this.querySelector('.btn');
                if (button) {
                    button.click();
                }
            }
        });
    });
    
    // Add ARIA labels for better screen reader support
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        link.setAttribute('aria-label', `Navigate to ${text} section`);
    });
}

// Utility functions
function createModal(title, content) {
    const modalId = 'dynamicModal_' + Date.now();
    const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    
    // Clean up modal after it's hidden
    document.getElementById(modalId).addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
    
    return modal;
}

function showAlert(message, type = 'info') {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
             style="top: 90px; right: 20px; z-index: 9999; max-width: 400px;" role="alert">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert.position-fixed');
        if (alerts.length > 0) {
            const latestAlert = alerts[alerts.length - 1];
            try {
                const bsAlert = new bootstrap.Alert(latestAlert);
                bsAlert.close();
            } catch (error) {
                // Fallback: remove the alert manually
                latestAlert.remove();
            }
        }
    }, 5000);
}

// Make resetUploadArea globally available
window.resetUploadArea = resetUploadArea;