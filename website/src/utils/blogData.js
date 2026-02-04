export const blogPosts = [
    {
        id: 'understanding-cardiovascular-health',
        title: 'Modern Advances in Cardiovascular Diagnostics',
        author: 'Dr. Sarah Wilson',
        category: 'Cardiology',
        date: 'Feb 01, 2024',
        excerpt: 'How AI and machine learning are revolutionizing the way we detect heart conditions before they become critical.',
        content: `
            Cardiovascular diseases remain the leading cause of mortality globally. However, the integration of 
            Artificial Intelligence in diagnostic pathways is shifting the paradigm from reactive to proactive care.
            
            At CareSync, we utilize neural networks to analyze echocardiograms with precision levels exceeding 
            traditional manual reviews. This technology allows for the detection of subtle myocardial changes 
            that often precede clinical symptoms.
            
            Key takeaways for patients:
            1. Early detection through regular screening is vital.
            2. Biomarker tracking (Troponin, Pro-BNP) provides a window into cardiac stress.
            3. Lifestyle modifications remain the bedrock of long-term heart health.
        `,
        image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=2070&auto=format&fit=crop',
        tags: ['Heart Health', 'AI', 'Diagnostics']
    },
    {
        id: 'neurology-and-longevity',
        title: 'The Neural Link: Protecting Cognitive Function',
        author: 'Dr. James Miller',
        category: 'Neurology',
        date: 'Jan 25, 2024',
        excerpt: 'Exploring the relationship between neuro-plasticity and modern treatment modalities for degenerative disorders.',
        content: `
            Neurodegeneration is no longer seen as an inevitable consequence of aging. Recent research into 
            peptide therapies and neuro-protective clinical pathways has shown promising results in 
            stabilizing cognitive decline.
            
            Our neurology department focuses on interdisciplinary approaches, combining pharmacological 
            intervention with cognitive stimulation protocols.
        `,
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop',
        tags: ['Brain Health', 'Neurology', 'Aging']
    }
];

// Generate more posts for SEO depth
const medicalKeywords = ['Diabetes', 'Oncology', 'Pediatrics', 'Mental Health', 'Dermatology', 'Surgical Excellence', 'Global Health', 'Molecular Biology'];
for (let i = 1; i <= 30; i++) {
    const keyword = medicalKeywords[i % medicalKeywords.length];
    blogPosts.push({
        id: `clinical-insight-${i}`,
        title: `Clinical Analysis: The Impact of ${keyword} on Modern Patient Outcomes`,
        author: 'CareSync Research Team',
        category: keyword,
        date: 'Jan 20, 2024',
        excerpt: `An in-depth look at how contemporary ${keyword.toLowerCase()} protocols are evolving to meet global challenges.`,
        content: `This article explores the systemic changes in ${keyword.toLowerCase()} diagnostics over the last decade. Our clinical staff provides insights into the latest peer-reviewed research and practical applications.`,
        image: `https://images.unsplash.com/photo-${1576091160000 + (i * 100)}?auto=format&fit=crop&q=60`,
        tags: [keyword, 'Medical Research', 'Public Health']
    });
}
