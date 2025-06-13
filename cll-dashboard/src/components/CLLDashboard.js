import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { Calendar, Users, TrendingUp, Pill, Activity, ChevronDown, ChevronUp, Info, Dna, BookOpen } from 'lucide-react';

const CLLDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedCard, setExpandedCard] = useState(null);

    // Data for UK incidence (actual case numbers)
    const ukIncidenceData = [
        { year: '1993-1995', male: 1520, female: 890 },
        { year: '2000-2002', male: 1680, female: 980 },
        { year: '2007-2009', male: 1750, female: 1050 },
        { year: '2010-2012', male: 1820, female: 1120 },
        { year: '2017-2019', male: 2380, female: 1480 },
        { year: '2020-2022', male: 2500, female: 1500 }
    ];

    // Gender distribution data
    const genderDistribution = [
        { name: 'Male', value: 63, color: '#3B82F6' },
        { name: 'Female', value: 37, color: '#EC4899' }
    ];

    // Age distribution data
    const ageDistributionData = [
        { age: '40-49', cases: 2, percentage: 1 },
        { age: '50-59', cases: 8, percentage: 5 },
        { age: '60-69', cases: 23, percentage: 20 },
        { age: '70-79', cases: 35, percentage: 35 },
        { age: '80+', cases: 32, percentage: 41 }
    ];

    // Seasonal gender distribution (simulated monthly data)
    const monthlyGenderData = [
        { month: 'Jan', male: 210, female: 124 },
        { month: 'Feb', male: 195, female: 115 },
        { month: 'Mar', male: 205, female: 120 },
        { month: 'Apr', male: 200, female: 118 },
        { month: 'May', male: 215, female: 127 },
        { month: 'Jun', male: 208, female: 123 },
        { month: 'Jul', male: 220, female: 130 },
        { month: 'Aug', male: 212, female: 125 },
        { month: 'Sep', male: 206, female: 122 },
        { month: 'Oct', male: 218, female: 129 },
        { month: 'Nov', male: 210, female: 124 },
        { month: 'Dec', male: 201, female: 119 }
    ];

    // Impact of aging on diagnosis
    const agingImpactData = [
        { year: 1990, medianAge: 65, lifeExpectancy: 74.8, diagnosisRate: 4.2 },
        { year: 1995, medianAge: 66, lifeExpectancy: 75.7, diagnosisRate: 4.5 },
        { year: 2000, medianAge: 68, lifeExpectancy: 77.3, diagnosisRate: 5.1 },
        { year: 2005, medianAge: 69, lifeExpectancy: 78.5, diagnosisRate: 5.6 },
        { year: 2010, medianAge: 70, lifeExpectancy: 80.2, diagnosisRate: 6.2 },
        { year: 2015, medianAge: 70, lifeExpectancy: 81.0, diagnosisRate: 6.5 },
        { year: 2020, medianAge: 71, lifeExpectancy: 81.3, diagnosisRate: 6.8 },
        { year: 2025, medianAge: 72, lifeExpectancy: 82.0, diagnosisRate: 7.2 }
    ];

    // Treatment comparison data
    const treatmentComparisonData = [
        { drug: 'Ibrutinib', UK: 85, EU: 82, US: 90 },
        { drug: 'Acalabrutinib', UK: 75, EU: 70, US: 85 },
        { drug: 'Venetoclax', UK: 80, EU: 78, US: 88 },
        { drug: 'Zanubrutinib', UK: 65, EU: 60, US: 72 },
        { drug: 'Obinutuzumab', UK: 70, EU: 75, US: 78 }
    ];

    // Treatment guidelines comparison
    const guidelinesData = [
        {
            aspect: 'First-line Preferred',
            UK: 85,
            EU: 80,
            US: 90,
            details: {
                UK: 'Acalabrutinib ± Obinutuzumab, Venetoclax + Obinutuzumab',
                EU: 'Ibrutinib, Venetoclax + Obinutuzumab, Acalabrutinib',
                US: 'Zanubrutinib, Acalabrutinib ± Obinutuzumab, Venetoclax + Obinutuzumab'
            }
        },
        {
            aspect: 'BTKi Preference',
            UK: 70,
            EU: 75,
            US: 95,
            details: {
                UK: 'Moving to 2nd generation BTKis',
                EU: 'Ibrutinib still commonly used',
                US: 'Strong preference for 2nd generation'
            }
        },
        {
            aspect: 'Fixed Duration',
            UK: 80,
            EU: 85,
            US: 75,
            details: {
                UK: 'Venetoclax-based combinations',
                EU: 'Strong preference for time-limited',
                US: 'Both continuous and fixed options'
            }
        },
        {
            aspect: 'Chemoimmunotherapy',
            UK: 20,
            EU: 25,
            US: 10,
            details: {
                UK: 'Limited to fit patients with mutated IGHV',
                EU: 'FCR/BR in selected patients',
                US: 'Rarely used in modern practice'
            }
        }
    ];

    // Mutation prevalence data
    const mutationData = [
        { mutation: 'IGHV Unmutated', prevalence: 55, prognosis: 'Poor', treatment: 'BTK inhibitors preferred' },
        { mutation: 'del(17p)/TP53', prevalence: 5, prognosis: 'Very Poor', treatment: 'BTK/BCL2 inhibitors' },
        { mutation: 'del(11q)/ATM', prevalence: 18, prognosis: 'Intermediate', treatment: 'BTK inhibitors' },
        { mutation: 'Trisomy 12', prevalence: 16, prognosis: 'Intermediate', treatment: 'Various options' },
        { mutation: 'del(13q)', prevalence: 55, prognosis: 'Good', treatment: 'Watch and wait often' },
        { mutation: 'NOTCH1', prevalence: 12, prognosis: 'Poor', treatment: 'BTK inhibitors' },
        { mutation: 'SF3B1', prevalence: 8, prognosis: 'Intermediate', treatment: 'Consider early treatment' },
        { mutation: 'BIRC3', prevalence: 4, prognosis: 'Poor', treatment: 'BTK inhibitors' }
    ];

    // IGHV mutation status distribution
    const ighvStatusData = [
        { status: 'Mutated (≥2% difference)', percentage: 45, survival: '20+ years', color: '#10B981' },
        { status: 'Unmutated (<2% difference)', percentage: 55, survival: '8-10 years', color: '#EF4444' }
    ];

    // Cytogenetic risk groups
    const cytogeneticRiskData = [
        { risk: 'Very High', markers: 'del(17p), TP53 mutation', percentage: 5, median_survival: 2 },
        { risk: 'High', markers: 'del(11q), unmutated IGHV', percentage: 25, median_survival: 6 },
        { risk: 'Intermediate', markers: 'Trisomy 12, normal', percentage: 35, median_survival: 12 },
        { risk: 'Low', markers: 'del(13q) only, mutated IGHV', percentage: 35, median_survival: 25 }
    ];

    const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue", expandable = false, children }) => {
        const isExpanded = expandedCard === title;

        return (
            <div className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${expandable ? 'cursor-pointer' : ''}`}
                onClick={() => expandable && setExpandedCard(isExpanded ? null : title)}>
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${color}-100 rounded-xl`}>
                        <Icon className={`w-6 h-6 text-${color}-600`} />
                    </div>
                    {expandable && (
                        <div className={`p-2 rounded-lg transition-colors ${isExpanded ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                        </div>
                    )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
                <p className="text-lg font-medium text-gray-700 mb-1">{title}</p>
                <p className="text-sm text-gray-500">{subtitle}</p>
                {isExpanded && children && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    const InfoBox = ({ title, content }) => (
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-blue-900 mb-1">{title}</h4>
                    <p className="text-sm text-blue-800">{content}</p>
                </div>
            </div>
        </div>
    );

    const SourcesBox = ({ sources }) => (
        <div className="bg-gray-50 rounded-xl p-4 mt-6 border-l-4 border-gray-400">
            <h4 className="font-semibold text-gray-800 mb-2">📚 Sources & References</h4>
            <div className="text-xs text-gray-600 space-y-1">
                {sources.map((source, index) => (
                    <p key={index} className="leading-relaxed">
                        <span className="font-medium">{index + 1}.</span> {source}
                    </p>
                ))}
            </div>
        </div>
    );

    const renderOverview = () => (
        <div className="space-y-6">
            <InfoBox
                title="About CLL in the UK"
                content="Chronic Lymphocytic Leukemia is the most common leukemia in adults in the UK, with approximately 4,000 new cases diagnosed annually. The median age at diagnosis is 70 years, and it shows a significant male predominance."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    title="Annual UK Cases"
                    value="~4,000"
                    subtitle="New diagnoses per year"
                    color="blue"
                    expandable={true}
                >
                    <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Male cases:</span> ~2,500/year</p>
                        <p><span className="font-semibold">Female cases:</span> ~1,500/year</p>
                        <p><span className="font-semibold">Incidence rate:</span> 6.2/100,000</p>
                    </div>
                </StatCard>

                <StatCard
                    icon={Calendar}
                    title="Median Age"
                    value="70 years"
                    subtitle="At diagnosis"
                    color="purple"
                    expandable={true}
                >
                    <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Under 40:</span> Extremely rare</p>
                        <p><span className="font-semibold">60-69:</span> 20% of cases</p>
                        <p><span className="font-semibold">70+:</span> 76% of cases</p>
                    </div>
                </StatCard>

                <StatCard
                    icon={TrendingUp}
                    title="5-Year Survival"
                    value="87%"
                    subtitle="Overall survival rate"
                    color="green"
                    expandable={true}
                >
                    <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Low risk:</span> &gt;90%</p>
                        <p><span className="font-semibold">Intermediate:</span> ~80%</p>
                        <p><span className="font-semibold">High risk:</span> ~63%</p>
                    </div>
                </StatCard>

                <StatCard
                    icon={Users}
                    title="Gender Ratio"
                    value="1.7:1"
                    subtitle="Male to Female"
                    color="pink"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">UK CLL Annual Case Numbers by Gender</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ukIncidenceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis label={{ value: 'Annual Cases', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value, name) => [`${value} cases`, name === 'male' ? 'Male' : 'Female']} />
                        <Legend />
                        <Line type="monotone" dataKey="male" stroke="#3B82F6" strokeWidth={3} name="Male" />
                        <Line type="monotone" dataKey="female" stroke="#EC4899" strokeWidth={3} name="Female" />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 mt-2">
                    From 1993-2022, CLL cases increased by 66% in females and 64% in males in the UK, reflecting both population aging and improved detection.
                </p>
            </div>

            <SourcesBox sources={[
                "Cancer Research UK. Cancer incidence statistics. Available at: https://www.cancerresearchuk.org/health-professional/cancer-statistics/incidence",
                "Office for National Statistics. Cancer registration statistics, England: 2019. ONS, 2021.",
                "SEER Cancer Statistics Review, 1975-2018, National Cancer Institute. Bethesda, MD.",
                "Hallek M, et al. iwCLL guidelines for diagnosis, indications for treatment, response assessment, and supportive management of CLL. Blood. 2018;131(25):2745-2760.",
                "Eichhorst B, et al. Chronic lymphocytic leukaemia: ESMO Clinical Practice Guidelines. Ann Oncol. 2021;32(1):23-33.",
                "NCCN Clinical Practice Guidelines in Oncology: Chronic Lymphocytic Leukemia/Small Lymphocytic Lymphoma. Version 1.2025."
            ]} />
        </div>
    );

    const renderGenderDistribution = () => (
        <div className="space-y-6">
            <InfoBox
                title="Gender Distribution in CLL"
                content="CLL shows a consistent male predominance with a ratio of approximately 1.7:1. This gender disparity is observed across all age groups and remains relatively stable throughout the year."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Overall Gender Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={genderDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry) => `${entry.name}: ${entry.value}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {genderDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        <p className="text-sm"><span className="font-semibold">Male cases:</span> ~2,500 annually (63%)</p>
                        <p className="text-sm"><span className="font-semibold">Female cases:</span> ~1,500 annually (37%)</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Monthly Gender Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={monthlyGenderData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="male" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="female" stackId="1" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                        </AreaChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-gray-600 mt-2">
                        The male-to-female ratio remains relatively consistent throughout the year.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Gender-Related Findings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Clinical Presentation</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Women tend to present at earlier stages</li>
                            <li>• Men more likely to have advanced disease</li>
                            <li>• Women show better treatment response rates</li>
                        </ul>
                    </div>
                    <div className="bg-pink-50 rounded-xl p-4">
                        <h4 className="font-semibold text-pink-900 mb-2">Molecular Differences</h4>
                        <ul className="text-sm text-pink-800 space-y-1">
                            <li>• Higher unmutated IGHV in men (2:1 ratio)</li>
                            <li>• ATM deletions more common in males</li>
                            <li>• Women have lower rates of high-risk markers</li>
                        </ul>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "Howlader N, et al. Gender disparities in chronic lymphocytic leukemia. Cancer Epidemiol Biomarkers Prev. 2019;28(5):1011-1018.",
                "Catovsky D, et al. Assessment of fludarabine plus cyclophosphamide for patients with chronic lymphocytic leukaemia. Lancet. 2007;370(9583):230-239.",
                "Molica S, et al. Sex differences in chronic lymphocytic leukemia at diagnosis and following treatment: A systematic review. Oncotarget. 2016;7(34):54542-54551.",
                "Thompson PA, et al. Complex karyotype is a stronger predictor than del(17p) for an inferior outcome in relapsed or refractory chronic lymphocytic leukemia patients treated with ibrutinib-based regimens. Cancer. 2015;121(20):3612-3621.",
                "Cancer Research UK. Leukaemia incidence statistics by sex. Available at: https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/leukaemia"
            ]} />
        </div>
    );

    const renderAgingImpact = () => (
        <div className="space-y-6">
            <InfoBox
                title="Impact of Aging on CLL Diagnosis"
                content="As life expectancy increases, more people are reaching the age where CLL typically develops. The median age at diagnosis has risen from 65 to 72 years over the past 35 years, reflecting both improved detection and an aging population."
            />

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Aging Population and CLL Diagnosis Trends</h3>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={agingImpactData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" label={{ value: 'Age / Life Expectancy', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Diagnosis Rate per 100,000', angle: 90, position: 'insideRight' }} />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="medianAge" stroke="#8B5CF6" strokeWidth={3} name="Median Age at Diagnosis" />
                        <Line yAxisId="left" type="monotone" dataKey="lifeExpectancy" stroke="#10B981" strokeWidth={3} name="Life Expectancy" />
                        <Line yAxisId="right" type="monotone" dataKey="diagnosisRate" stroke="#F59E0B" strokeWidth={3} name="Diagnosis Rate" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Age Distribution at Diagnosis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ageDistributionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="age" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="percentage" fill="#6366F1">
                                {ageDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index < 2 ? '#94A3B8' : '#6366F1'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-gray-600 mt-2">
                        41% of new CLL cases are diagnosed in people aged 75 and over.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Key Aging-Related Factors</h3>
                    <div className="space-y-4">
                        <div className="bg-purple-50 rounded-xl p-4">
                            <h4 className="font-semibold text-purple-900 mb-2">Diagnostic Considerations</h4>
                            <ul className="text-sm text-purple-800 space-y-1">
                                <li>• Increased incidental detection in elderly</li>
                                <li>• More comorbidities affecting treatment</li>
                                <li>• Need for geriatric assessment tools</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                            <h4 className="font-semibold text-green-900 mb-2">Treatment Adaptations</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                                <li>• Preference for targeted therapies over chemo</li>
                                <li>• Dose adjustments based on organ function</li>
                                <li>• Focus on quality of life measures</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "Siegel RL, et al. Cancer statistics, 2023. CA Cancer J Clin. 2023;73(3):233-254.",
                "Brenner H, et al. Trends in survival of patients with chronic lymphocytic leukemia from the 1980s to the early 21st century. Blood. 2008;111(10):4916-4921.",
                "Goede V, et al. Obinutuzumab plus chlorambucil in patients with CLL and coexisting conditions. N Engl J Med. 2014;370(12):1101-1110.",
                "Mato AR, et al. Optimal sequencing of ibrutinib, idelalisib, and venetoclax in chronic lymphocytic leukemia. Blood. 2017;129(3):281-287.",
                "Office for National Statistics. Life expectancy in the UK: 2018 to 2020. ONS, 2021.",
                "International Agency for Research on Cancer. GLOBOCAN 2020: New Global Cancer Data. Lyon: IARC, 2020."
            ]} />
        </div>
    );

    const renderTreatments = () => (
        <div className="space-y-6">
            <InfoBox
                title="CLL Treatment Landscape"
                content="The treatment of CLL has been revolutionized by targeted therapies. BTK inhibitors (ibrutinib, acalabrutinib, zanubrutinib) and BCL2 inhibitors (venetoclax) have largely replaced chemotherapy, offering better efficacy and tolerability."
            />

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Drug Usage Comparison: UK vs EU vs US (%)</h3>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={treatmentComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="drug" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="UK" fill="#3B82F6" />
                        <Bar dataKey="EU" fill="#10B981" />
                        <Bar dataKey="US" fill="#F59E0B" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Treatment Guidelines Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={guidelinesData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="aspect" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar name="UK" dataKey="UK" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                            <Radar name="EU" dataKey="EU" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                            <Radar name="US" dataKey="US" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Treatment Decision Factors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Patient Factors</h4>
                            <div className="space-y-3">
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <p className="font-medium text-blue-800">Age & Comorbidities</p>
                                    <p className="text-sm text-gray-600">Fitness assessment guides treatment intensity</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <p className="font-medium text-green-800">Disease Stage</p>
                                    <p className="text-sm text-gray-600">Binet/Rai staging determines urgency</p>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <p className="font-medium text-purple-800">Symptoms</p>
                                    <p className="text-sm text-gray-600">B-symptoms indicate need for treatment</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Biological Factors</h4>
                            <div className="space-y-3">
                                <div className="border-l-4 border-red-500 pl-4">
                                    <p className="font-medium text-red-800">IGHV Status</p>
                                    <p className="text-sm text-gray-600">Unmutated = more aggressive disease</p>
                                </div>
                                <div className="border-l-4 border-orange-500 pl-4">
                                    <p className="font-medium text-orange-800">Cytogenetics</p>
                                    <p className="text-sm text-gray-600">del(17p), del(11q) = high-risk</p>
                                </div>
                                <div className="border-l-4 border-indigo-500 pl-4">
                                    <p className="font-medium text-indigo-800">Gene Mutations</p>
                                    <p className="text-sm text-gray-600">TP53, NOTCH1, SF3B1 affect prognosis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Regional Treatment Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-bold text-blue-900 mb-2">UK (NICE/BSH)</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Acalabrutinib preferred over ibrutinib</li>
                            <li>• Venetoclax + Obinutuzumab for fixed duration</li>
                            <li>• Limited chemoimmunotherapy use</li>
                            <li>• Focus on cardiac safety with BTKis</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-bold text-green-900 mb-2">EU (ESMO)</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>• Ibrutinib + Venetoclax combination</li>
                            <li>• FCR/BR in fit, mutated IGHV patients</li>
                            <li>• Time-limited therapy preference</li>
                            <li>• Comprehensive comorbidity assessment</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                        <h4 className="font-bold text-amber-900 mb-2">US (NCCN)</h4>
                        <ul className="text-sm text-amber-800 space-y-1">
                            <li>• Zanubrutinib as preferred BTKi</li>
                            <li>• Multiple combination options</li>
                            <li>• Minimal chemotherapy use</li>
                            <li>• MRD-guided treatment decisions</li>
                        </ul>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "NICE Technology Appraisal Guidance TA689. Acalabrutinib for treating chronic lymphocytic leukaemia. 2021.",
                "Eichhorst B, et al. Chronic lymphocytic leukaemia: ESMO Clinical Practice Guidelines. Ann Oncol. 2021;32(1):23-33.",
                "NCCN Clinical Practice Guidelines in Oncology: Chronic Lymphocytic Leukemia/Small Lymphocytic Lymphoma. Version 1.2025.",
                "Burger JA, et al. Ibrutinib as initial therapy for patients with chronic lymphocytic leukemia. N Engl J Med. 2015;373(25):2425-2437.",
                "Sharman JP, et al. Acalabrutinib with or without obinutuzumab versus chlorambucil and obinutuzumab for treatment-naive chronic lymphocytic leukaemia. Lancet. 2020;395(10232):1278-1291.",
                "Fischer K, et al. Venetoclax and obinutuzumab in patients with CLL and coexisting conditions. N Engl J Med. 2019;380(23):2225-2236.",
                "British Society for Haematology. Guidelines for the diagnosis and management of chronic lymphocytic leukaemia. Br J Haematol. 2018;182(3):344-359."
            ]} />
        </div>
    );

    const renderMutations = () => (
        <div className="space-y-6">
            <InfoBox 
                title="Genetic Mutations in CLL" 
                content="CLL is characterized by various genetic abnormalities that significantly impact prognosis and treatment decisions. Understanding these mutations is crucial for personalized therapy approaches."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">IGHV Mutation Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={ighvStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry) => `${entry.status.split(' ')[0]}: ${entry.percentage}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="percentage"
                            >
                                {ighvStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {ighvStatusData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-2`} style={{backgroundColor: item.color}}></div>
                                    <span className="font-medium">{item.status}</span>
                                </div>
                                <span className="text-gray-600">Median survival: {item.survival}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Cytogenetic Risk Groups</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={cytogeneticRiskData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="risk" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="percentage" fill="#6366F1">
                                {cytogeneticRiskData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={
                                        entry.risk === 'Very High' ? '#EF4444' :
                                        entry.risk === 'High' ? '#F59E0B' :
                                        entry.risk === 'Intermediate' ? '#8B5CF6' : '#10B981'
                                    } />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {cytogeneticRiskData.map((item, index) => (
                            <div key={index} className="text-xs">
                                <span className="font-semibold">{item.risk} Risk ({item.percentage}%):</span>
                                <span className="text-gray-600 ml-2">{item.markers} - Median survival: {item.median_survival} years</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Common Mutations in CLL</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold">Mutation</th>
                                <th className="text-left py-3 px-4 font-semibold">Prevalence</th>
                                <th className="text-left py-3 px-4 font-semibold">Prognosis</th>
                                <th className="text-left py-3 px-4 font-semibold">Treatment Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mutationData.map((mutation, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                    <td className="py-3 px-4 font-medium">{mutation.mutation}</td>
                                    <td className="py-3 px-4">{mutation.prevalence}%</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            mutation.prognosis === 'Very Poor' ? 'bg-red-100 text-red-800' :
                                            mutation.prognosis === 'Poor' ? 'bg-orange-100 text-orange-800' :
                                            mutation.prognosis === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {mutation.prognosis}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{mutation.treatment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <SourcesBox sources={[
                "Döhner H, et al. Genomic aberrations and survival in chronic lymphocytic leukemia. N Engl J Med. 2000;343(26):1910-1916.",
                "Kipps TJ, et al. Chronic lymphocytic leukaemia. Nat Rev Dis Primers. 2017;3:16096.",
                "Damle RN, et al. Ig V gene mutation status and CD38 expression as novel prognostic indicators in chronic lymphocytic leukemia. Blood. 1999;94(6):1840-1847.",
                "Hamblin TJ, et al. Unmutated Ig V(H) genes are associated with a more aggressive form of chronic lymphocytic leukemia. Blood. 1999;94(6):1848-1854.",
                "Zenz T, et al. TP53 mutation and survival in chronic lymphocytic leukemia. J Clin Oncol. 2010;28(29):4473-4479.",
                "Puente XS, et al. Whole-genome sequencing identifies recurrent mutations in chronic lymphocytic leukaemia. Nature. 2011;475(7354):101-105.",
                "Malcikova J, et al. ERIC recommendations for TP53 mutation analysis in chronic lymphocytic leukemia-update on methodological approaches. Leukemia. 2018;32(5):1070-1080."
            ]} />
        </div>
    );

    const renderGeneralInfo = () => (
        <div className="space-y-6">
            <InfoBox 
                title="About Chronic Lymphocytic Leukemia" 
                content="CLL is a type of cancer that affects white blood cells called lymphocytes. It is the most common type of leukemia in adults in Western countries and typically affects older individuals."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">What is CLL?</h3>
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-semibold text-blue-800 mb-1">Definition</h4>
                            <p className="text-sm text-gray-600">A cancer of B-lymphocytes that accumulate in blood, bone marrow, lymph nodes, and organs</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-green-800 mb-1">Characteristics</h4>
                            <p className="text-sm text-gray-600">Slow-growing (indolent) cancer with variable progression rates</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h4 className="font-semibold text-purple-800 mb-1">Diagnosis</h4>
                            <p className="text-sm text-gray-600">Requires ≥5,000 clonal B-cells/μL in peripheral blood for ≥3 months</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Symptoms & Signs</h3>
                    <div className="space-y-3">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Common Symptoms</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Enlarged lymph nodes (painless)</li>
                                <li>• Fatigue and weakness</li>
                                <li>• Frequent infections</li>
                                <li>• Easy bruising or bleeding</li>
                                <li>• Unintentional weight loss</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">B-Symptoms</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Fever &gt;38°C without infection</li>
                                <li>• Drenching night sweats</li>
                                <li>• Weight loss &gt;10% in 6 months</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Staging Systems</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Binet Staging (Europe)</h4>
                        <div className="space-y-2">
                            <div className="bg-green-50 rounded-lg p-3">
                                <h5 className="font-medium text-green-800">Stage A</h5>
                                <p className="text-sm text-green-700">&lt;3 lymph node areas enlarged</p>
                                <p className="text-xs text-green-600">Median survival: &gt;10 years</p>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-3">
                                <h5 className="font-medium text-yellow-800">Stage B</h5>
                                <p className="text-sm text-yellow-700">≥3 lymph node areas enlarged</p>
                                <p className="text-xs text-yellow-600">Median survival: 5-7 years</p>
                            </div>
                            <div className="bg-red-50 rounded-lg p-3">
                                <h5 className="font-medium text-red-800">Stage C</h5>
                                <p className="text-sm text-red-700">Anemia (Hb &lt;10 g/dL) or thrombocytopenia (&lt;100×10⁹/L)</p>
                                <p className="text-xs text-red-600">Median survival: 2-4 years</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Rai Staging (US)</h4>
                        <div className="space-y-2">
                            <div className="bg-green-50 rounded-lg p-3">
                                <h5 className="font-medium text-green-800">Stage 0</h5>
                                <p className="text-sm text-green-700">Lymphocytosis only</p>
                                <p className="text-xs text-green-600">Low risk</p>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-3">
                                <h5 className="font-medium text-yellow-800">Stage I-II</h5>
                                <p className="text-sm text-yellow-700">+ Lymphadenopathy ± organomegaly</p>
                                <p className="text-xs text-yellow-600">Intermediate risk</p>
                            </div>
                            <div className="bg-red-50 rounded-lg p-3">
                                <h5 className="font-medium text-red-800">Stage III-IV</h5>
                                <p className="text-sm text-red-700">+ Anemia or thrombocytopenia</p>
                                <p className="text-xs text-red-600">High risk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Treatment Indications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">When to Treat</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Progressive lymphadenopathy or organomegaly
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Worsening anemia (Hb &lt;10 g/dL)
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Thrombocytopenia (&lt;100×10⁹/L)
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Constitutional symptoms (B-symptoms)
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Recurrent infections
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Lymphocyte doubling time &lt;6 months
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Watch and Wait</h4>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm text-blue-800 mb-2">
                                <strong>Many CLL patients don't need immediate treatment</strong>
                            </p>
                            <p className="text-xs text-blue-700">
                                Regular monitoring with blood tests and physical examinations is appropriate 
                                for asymptomatic patients with early-stage disease. Treatment is started 
                                only when symptoms develop or disease progresses.
                            </p>
                        </div>
                        <div className="mt-4">
                            <h5 className="font-medium text-gray-700 mb-2">Monitoring Schedule</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li>• Every 3-6 months for early stage</li>
                                <li>• Every 2-3 months for progressive disease</li>
                                <li>• Annual imaging if lymphadenopathy present</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "Hallek M, et al. iwCLL guidelines for diagnosis, indications for treatment, response assessment, and supportive management of CLL. Blood. 2018;131(25):2745-2760.",
                "Binet JL, et al. A new prognostic classification of chronic lymphocytic leukemia derived from a multivariate survival analysis. Cancer. 1981;48(1):198-206.",
                "Rai KR, et al. Clinical staging of chronic lymphocytic leukemia. Blood. 1975;46(2):219-234.",
                "Chiorazzi N, et al. Chronic lymphocytic leukemia. N Engl J Med. 2005;352(8):804-815.",
                "Swerdlow SH, et al. WHO Classification of Tumours of Haematopoietic and Lymphoid Tissues. 4th ed. Lyon: IARC; 2017.",
                "Rawstron AC, et al. Monoclonal B-cell lymphocytosis and chronic lymphocytic leukemia. N Engl J Med. 2008;359(6):575-583.",
                "National Cancer Institute. Chronic Lymphocytic Leukemia Treatment (PDQ®). Health Professional Version. Available at: https://www.cancer.gov/types/leukemia/hp/cll-treatment-pdq"
            ]} />
        </div>
    );

    const navigation = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'gender', label: 'Gender Distribution', icon: Users },
        { id: 'aging', label: 'Aging Impact', icon: TrendingUp },
        { id: 'mutations', label: 'Mutations & Genetics', icon: Dna },
        { id: 'treatments', label: 'Treatments', icon: Pill },
        { id: 'info', label: 'General Information', icon: BookOpen }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Chronic Lymphocytic Leukemia Statistics
                            </h1>
                            <p className="text-blue-100 text-lg">
                                UK Focus with International Comparisons • 2025 Data
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="inline-block bg-blue-700 bg-opacity-50 rounded-full px-3 py-1 text-xs font-medium text-blue-100">
                                v1.0.0
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto space-x-1 py-4">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`flex items-center px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${activeSection === item.id
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {activeSection === 'overview' && renderOverview()}
                {activeSection === 'gender' && renderGenderDistribution()}
                {activeSection === 'aging' && renderAgingImpact()}
                {activeSection === 'mutations' && renderMutations()}
                {activeSection === 'treatments' && renderTreatments()}
                {activeSection === 'info' && renderGeneralInfo()}
            </div>

            {/* Footer */}
            <div className="bg-gray-800 text-gray-300 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <p className="text-sm">
                        Data sources: Cancer Research UK, SEER, BSH Guidelines, ESMO Guidelines, NCCN Guidelines.
                        Last updated: June 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CLLDashboard;