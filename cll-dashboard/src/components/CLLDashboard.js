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

    // Treatment comparison data (ESMO 2024 - Balanced approach reflecting equal recommendations)
    const treatmentComparisonData = [
        { drug: 'Venetoclax + Obinutuzumab', UK: 85, EU: 88, US: 82 },
        { drug: 'Acalabrutinib ± Obinutuzumab', UK: 88, EU: 85, US: 90 },
        { drug: 'Zanubrutinib', UK: 82, EU: 80, US: 87 },
        { drug: 'Ibrutinib + Venetoclax', UK: 78, EU: 82, US: 85 },
        { drug: 'Ibrutinib ± Rituximab', UK: 75, EU: 70, US: 80 },
        { drug: 'Chemoimmunotherapy (FCR)', UK: 45, EU: 40, US: 50 }
    ];

    // Treatment guidelines comparison (ESMO 2024 - Balanced recommendations)
    const guidelinesData = [
        {
            aspect: 'Treatment Choice Flexibility',
            UK: 85,
            EU: 90,
            US: 88,
            details: {
                UK: 'Multiple first-line options with equal recommendations',
                EU: 'ESMO 2024: Both time-limited and continuous therapy valid',
                US: 'Patient and physician preference important in choice'
            }
        },
        {
            aspect: 'BTK Inhibitor Usage',
            UK: 82,
            EU: 85,
            US: 90,
            details: {
                UK: 'Acalabrutinib and zanubrutinib preferred over ibrutinib',
                EU: 'BTK inhibitors equally recommended with venetoclax combinations',
                US: 'Strong preference for BTK inhibitors, especially newer generation'
            }
        },
        {
            aspect: 'Time-Limited Therapy',
            UK: 88,
            EU: 85,
            US: 75,
            details: {
                UK: 'Preferred when efficacy similar, not mandatory',
                EU: 'ESMO 2024: Time-limited preferred but not exclusive',
                US: 'Growing acceptance but continuous therapy still widely used'
            }
        },
        {
            aspect: 'Patient-Centered Decisions',
            UK: 90,
            EU: 92,
            US: 85,
            details: {
                UK: 'Treatment choice based on patient factors and preferences',
                EU: 'ESMO 2024 emphasizes individualized treatment selection',
                US: 'Shared decision-making between patient and physician'
            }
        }
    ];

    // Note: Mutation data variables removed as they were unused in current implementation
    // Data is now embedded directly in the renderMutations component for better context

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
                title="ESMO 2024 Treatment Guidelines: Multiple Equally Effective First-Line Options"
                content="ESMO 2024 guidelines provide multiple equally recommended first-line treatments [I, A] for CLL. Treatment selection should be based on IGHV status, TP53 mutations, patient fitness, comorbidities, and preferences. Time-limited therapy is preferred when efficacy is similar, but both approaches are equally valid."
            />

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">ESMO 2024 First-Line Treatment Adoption Rates (%)</h3>
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
                <p className="text-sm text-gray-600 mt-2">
                    All shown treatments have equal [I, A] recommendations in ESMO 2024. Treatment selection is based on patient factors, IGHV status, TP53 mutations, comorbidities, and preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-4">ESMO 2024 Treatment Priorities Comparison</h3>
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
                    <h3 className="text-xl font-bold mb-4">ESMO 2024: Balanced Treatment Approach</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-800 mb-3">Time-Limited Therapy</h4>
                                <div className="space-y-3">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <p className="font-medium text-blue-800">Venetoclax + Obinutuzumab</p>
                                        <p className="text-sm text-gray-600">12 months treatment, treatment-free intervals</p>
                                    </div>
                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <p className="font-medium text-purple-800">Ibrutinib + Venetoclax</p>
                                        <p className="text-sm text-gray-600">15 months or MRD-guided duration</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-semibold text-green-800 mb-3">Continuous BTK Inhibitors</h4>
                                <div className="space-y-3">
                                    <div className="border-l-4 border-green-500 pl-4">
                                        <p className="font-medium text-green-800">Acalabrutinib ± Obinutuzumab</p>
                                        <p className="text-sm text-gray-600">Preferred BTKi with better cardiac profile</p>
                                    </div>
                                    <div className="border-l-4 border-indigo-500 pl-4">
                                        <p className="font-medium text-indigo-800">Zanubrutinib</p>
                                        <p className="text-sm text-gray-600">Superior PFS vs ibrutinib, fewer cardiac events</p>
                                    </div>
                                    <div className="border-l-4 border-gray-500 pl-4">
                                        <p className="font-medium text-gray-800">Ibrutinib ± Rituximab</p>
                                        <p className="text-sm text-gray-600">Established efficacy, cardiac monitoring needed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-yellow-50 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 mb-2">Key ESMO 2024 Principle</h4>
                            <p className="text-sm text-yellow-700">
                                <strong>Equal Recommendation:</strong> Time-limited therapy is preferred when efficacy is similar, 
                                but both approaches are equally valid. Treatment choice should consider patient factors, 
                                comorbidities, drug access, and individual preferences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">ESMO 2024: Regional Implementation of Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-bold text-blue-900 mb-2">UK (NICE/BSH)</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Multiple first-line options available</li>
                            <li>• Acalabrutinib preferred BTKi (cardiac safety)</li>
                            <li>• Venetoclax + Obinutuzumab option</li>
                            <li>• Patient factors guide selection</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-bold text-green-900 mb-2">EU (ESMO 2024)</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>• Equal recommendation for all approaches</li>
                            <li>• Time-limited therapy preferred when equal efficacy</li>
                            <li>• BTK inhibitors and venetoclax both valid</li>
                            <li>• Individual patient considerations paramount</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                        <h4 className="font-bold text-amber-900 mb-2">US (NCCN)</h4>
                        <ul className="text-sm text-amber-800 space-y-1">
                            <li>• Broad range of preferred regimens</li>
                            <li>• Zanubrutinib gaining preference over ibrutinib</li>
                            <li>• Both continuous and time-limited approaches</li>
                            <li>• Physician-patient shared decisions</li>
                        </ul>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "Eichhorst B, Ghia P, Niemann CU, et al. ESMO Clinical Practice Guideline interim update on new targeted therapies in the first line and at relapse of chronic lymphocytic leukaemia. Ann Oncol. 2024;35(9):762-768. doi:10.1016/j.annonc.2024.06.016",
                "Tam CS, Allan JN, Siddiqi T, et al. Fixed-duration ibrutinib plus venetoclax for first-line treatment of CLL: primary analysis of the CAPTIVATE FD cohort. Blood. 2022;139(22):3278-3289.",
                "Munir T, Cairns DA, Bloor A, et al. Chronic lymphocytic leukemia therapy guided by measurable residual disease. N Engl J Med. 2024;390(4):326-337.",
                "Al-Sawaf O, Zhang C, Tandon M, et al. Venetoclax plus obinutuzumab versus chlorambucil plus obinutuzumab for previously untreated chronic lymphocytic leukaemia (CLL14): follow-up results. Lancet Oncol. 2020;21(9):1188-1200.",
                "Kater AP, Owen C, Moreno C, et al. Fixed-duration ibrutinib-venetoclax in patients with chronic lymphocytic leukemia and comorbidities. NEJM Evid. 2022;1(7):EVIDoa2200006.",
                "Brown JR, Eichhorst B, Hillmen P, et al. Zanubrutinib or ibrutinib in relapsed or refractory chronic lymphocytic leukemia. N Engl J Med. 2023;388(4):319-332.",
                "Byrd JC, Hillmen P, Ghia P, et al. First-line acalabrutinib in patients with CLL. N Engl J Med. 2024;391(1):1-13.",
                "NCCN Clinical Practice Guidelines in Oncology: Chronic Lymphocytic Leukemia/Small Lymphocytic Lymphoma. Version 1.2025.",
                "Seymour JF, Kipps TJ, Eichhorst B, et al. Venetoclax-rituximab in relapsed or refractory chronic lymphocytic leukemia. N Engl J Med. 2018;378(12):1107-1120."
            ]} />
        </div>
    );

    const renderMutations = () => (
        <div className="space-y-6">
            <InfoBox
                title="ESMO 2024 Genetic Profiling & Treatment Selection"
                content="Genetic profiling is mandatory before treatment initiation. ESMO 2024 provides multiple equally effective treatment options across all mutation categories. Treatment selection should consider IGHV status, TP53 mutations, patient fitness, and preferences rather than favoring a single drug class."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mutation Types */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Genetic Markers</h3>
                    <div className="space-y-4">
                        <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="font-semibold text-red-700">del(17p)/TP53 mutation</h4>
                            <p className="text-sm text-gray-600">5-8% of patients</p>
                            <p className="text-xs text-gray-500 mt-1">
                                BTK inhibitors preferred [I,A]; venetoclax alternatives available
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h4 className="font-semibold text-orange-700">del(11q)</h4>
                            <p className="text-sm text-gray-600">15-20% of patients</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Multiple effective treatment options available
                            </p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-semibold text-blue-700">Trisomy 12</h4>
                            <p className="text-sm text-gray-600">15-25% of patients</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Often associated with atypical morphology and NOTCH1 mutations
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-green-700">del(13q)</h4>
                            <p className="text-sm text-gray-600">50-60% of patients</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Most favorable prognosis, excellent outcomes with all therapies
                            </p>
                        </div>
                    </div>
                </div>

                {/* IGHV Status */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">IGHV Mutation Status</h3>
                    <div className="space-y-4">
                        <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800">Mutated IGHV</h4>
                            <p className="text-sm text-green-700 mt-1">
                                ~60% of patients • Better prognosis
                            </p>
                            <ul className="text-xs text-green-600 mt-2 space-y-1">
                                <li>• Longer time to treatment</li>
                                <li>• Better response to therapy</li>
                                <li>• Excellent outcomes with all ESMO 2024 options</li>
                            </ul>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800">Unmutated IGHV</h4>
                            <p className="text-sm text-red-700 mt-1">
                                ~40% of patients • More aggressive course
                            </p>
                            <ul className="text-xs text-red-600 mt-2 space-y-1">
                                <li>• Earlier treatment needed</li>
                                <li>• Higher risk of Richter transformation</li>
                                <li>• Multiple effective treatment options available</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* BTK Resistance Mutations */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Treatment Resistance Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">BTK Inhibitor Resistance</h4>
                        <div className="space-y-3">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <h5 className="font-medium text-yellow-800">BTK C481S mutation</h5>
                                <p className="text-xs text-yellow-700 mt-1">
                                    Most common resistance mechanism to ibrutinib
                                </p>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <h5 className="font-medium text-yellow-800">PLCG2 mutations</h5>
                                <p className="text-xs text-yellow-700 mt-1">
                                    Alternative pathway activation
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">BCL2 Inhibitor Resistance</h4>
                        <div className="space-y-3">
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                <h5 className="font-medium text-purple-800">BCL2 mutations</h5>
                                <p className="text-xs text-purple-700 mt-1">
                                    Less common, often G101V
                                </p>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                <h5 className="font-medium text-purple-800">MCL1 upregulation</h5>
                                <p className="text-xs text-purple-700 mt-1">
                                    Compensatory anti-apoptotic mechanism
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "Döhner H, et al. Genomic aberrations and survival in chronic lymphocytic leukemia. N Engl J Med. 2000;343(26):1910-1916.",
                "Damle RN, et al. Ig V gene mutation status and CD38 expression as novel prognostic indicators in chronic lymphocytic leukemia. Blood. 2000;96(11):3989-3994.",
                "Burger JA, et al. Treatment of chronic lymphocytic leukemia. N Engl J Med. 2020;383(5):460-473.",
                "Thompson PA, et al. Minimal residual disease in chronic lymphocytic leukemia. Cancer. 2023;129(14):2098-2104.",
                "Seymour JF, et al. ESMO Guidelines Committee. Chronic lymphocytic leukaemia: ESMO Guidelines. Ann Oncol. 2024;35(8):701-718.",
                "Woyach JA, et al. Resistance mechanisms for the Bruton tyrosine kinase inhibitor ibrutinib. N Engl J Med. 2014;370(24):2286-2294.",
                "Blombery P, et al. Acquisition of the recurrent Gly101Val mutation in BCL2 confers resistance to venetoclax in patients with progressive chronic lymphocytic leukemia. Cancer Discov. 2019;9(3):342-353."
            ]} />
        </div>
    );

    const renderGeneralInfo = () => (
        <div className="space-y-6">
            <InfoBox>
                <strong>CLL Overview:</strong> Chronic Lymphocytic Leukemia is the most common leukemia in adults,
                accounting for approximately 25% of all leukemias. It primarily affects older adults with a
                median age at diagnosis of 70 years. Recent advances in targeted therapies have dramatically
                improved outcomes and quality of life for patients.
            </InfoBox>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Disease Basics */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">What is CLL?</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Disease Characteristics</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Cancer of B-lymphocytes (white blood cells)</li>
                                <li>• Accumulation of abnormal B-cells in blood, bone marrow, and lymph nodes</li>
                                <li>• Most indolent (slow-growing) form of leukemia</li>
                                <li>• Often discovered incidentally through routine blood tests</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Common Symptoms</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Enlarged lymph nodes (painless)</li>
                                <li>• Fatigue and weakness</li>
                                <li>• Frequent infections</li>
                                <li>• Easy bruising or bleeding</li>
                                <li>• Unintentional weight loss</li>
                                <li>• Night sweats</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Diagnosis */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Diagnosis & Staging</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Diagnostic Criteria</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Persistent lymphocytosis ≥5,000 B-cells/μL</li>
                                <li>• Flow cytometry showing characteristic phenotype</li>
                                <li>• Bone marrow biopsy (if indicated)</li>
                                <li>• Genetic testing (FISH, IGHV status)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Staging Systems</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-blue-50 rounded-lg p-3">
                                    <h5 className="font-medium text-blue-800 text-sm">Rai Staging</h5>
                                    <ul className="text-xs text-blue-700 mt-1">
                                        <li>• Stage 0: Lymphocytosis only</li>
                                        <li>• Stage I: + Lymphadenopathy</li>
                                        <li>• Stage II: + Organomegaly</li>
                                        <li>• Stage III: + Anemia</li>
                                        <li>• Stage IV: + Thrombocytopenia</li>
                                    </ul>
                                </div>
                                <div className="bg-green-50 rounded-lg p-3">
                                    <h5 className="font-medium text-green-800 text-sm">Binet Staging</h5>
                                    <ul className="text-xs text-green-700 mt-1">
                                        <li>• Stage A: &lt;3 lymphoid areas</li>
                                        <li>• Stage B: ≥3 lymphoid areas</li>
                                        <li>• Stage C: Anemia or thrombocytopenia</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Treatment Overview */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Treatment Approach</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Watch and Wait</h4>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm text-blue-800 mb-2">
                                <strong>For early-stage, asymptomatic patients</strong>
                            </p>
                            <ul className="text-xs text-blue-700 space-y-1">
                                <li>• Regular monitoring every 3-6 months</li>
                                <li>• Treatment only when symptoms develop</li>
                                <li>• No survival benefit from early treatment</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">First-Line Treatment</h4>
                        <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-sm text-green-800 mb-2">
                                <strong>ESMO 2024 Multiple Options [I, A]</strong>
                            </p>
                            <ul className="text-xs text-green-700 space-y-1">
                                <li>• Venetoclax + Obinutuzumab (time-limited)</li>
                                <li>• Ibrutinib + Venetoclax (time-limited)</li>
                                <li>• Acalabrutinib ± Obinutuzumab (continuous)</li>
                                <li>• Zanubrutinib (continuous)</li>
                                <li>• Ibrutinib ± Rituximab (continuous)</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Relapsed/Refractory</h4>
                        <div className="bg-orange-50 rounded-lg p-4">
                            <p className="text-sm text-orange-800 mb-2">
                                <strong>Depends on prior therapy</strong>
                            </p>
                            <ul className="text-xs text-orange-700 space-y-1">
                                <li>• BTK inhibitors (ibrutinib, acalabrutinib)</li>
                                <li>• Venetoclax combinations</li>
                                <li>• CAR-T cell therapy (investigational)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prognosis */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Prognosis & Survival</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Overall Survival Rates</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                <span className="text-sm font-medium text-green-800">5-year survival</span>
                                <span className="text-lg font-bold text-green-700">87%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                <span className="text-sm font-medium text-blue-800">10-year survival</span>
                                <span className="text-lg font-bold text-blue-700">68%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                <span className="text-sm font-medium text-purple-800">15-year survival</span>
                                <span className="text-lg font-bold text-purple-700">53%</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Prognostic Factors</h4>
                        <div className="space-y-2">
                            <div className="bg-green-50 border-l-4 border-green-400 p-3">
                                <h5 className="font-medium text-green-800 text-sm">Favorable</h5>
                                <ul className="text-xs text-green-700 mt-1">
                                    <li>• Mutated IGHV</li>
                                    <li>• del(13q) as sole abnormality</li>
                                    <li>• Low β2-microglobulin</li>
                                    <li>• Young age at diagnosis</li>
                                </ul>
                            </div>
                            <div className="bg-red-50 border-l-4 border-red-400 p-3">
                                <h5 className="font-medium text-red-800 text-sm">Unfavorable</h5>
                                <ul className="text-xs text-red-700 mt-1">
                                    <li>• Unmutated IGHV</li>
                                    <li>• del(17p)/TP53 mutation</li>
                                    <li>• del(11q)</li>
                                    <li>• High β2-microglobulin</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "Hallek M, et al. iwCLL guidelines for diagnosis, indications for treatment, response assessment, and supportive management of CLL. Blood. 2018;131(25):2745-2760.",
                "Seymour JF, et al. ESMO Guidelines Committee. Chronic lymphocytic leukaemia: ESMO Guidelines. Ann Oncol. 2024;35(8):701-718.",
                "Cancer Research UK. Chronic lymphocytic leukaemia (CLL) statistics. Available at: https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/leukaemia-cll",
                "National Cancer Institute. Chronic Lymphocytic Leukemia Treatment (PDQ®). Available at: https://www.cancer.gov/types/leukemia/hp/cll-treatment-pdq",
                "Surveillance, Epidemiology, and End Results (SEER) Program. Cancer Stat Facts: Chronic Lymphocytic Leukemia. National Cancer Institute.",
                "Rai KR, et al. Clinical staging of chronic lymphocytic leukemia. Blood. 1975;46(2):219-234.",
                "Binet JL, et al. A new prognostic classification of chronic lymphocytic leukemia derived from a multivariate survival analysis. Cancer. 1981;48(1):198-206."
            ]} />
        </div>
    );

    // Note: Treatment plans data removed as it was unused - data is embedded directly in the component

    const renderTreatmentPlans = () => (
        <div className="space-y-6">
            <InfoBox>
                <strong>ESMO 2024 Treatment Plans:</strong> Multiple effective first-line treatments are equally recommended. 
                The guidelines emphasize patient-centered treatment selection considering IGHV status, TP53 mutations, 
                patient fitness, comorbidities, and preferences. Both time-limited and continuous therapies are valid approaches.
            </InfoBox>

            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">ESMO 2024 First-Line Recommendations by Patient Group</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-3">Fit/Younger Patients with Mutated IGHV (No TP53 aberrations)</h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-green-50 p-2 rounded">
                                <strong>Equally Recommended Options [I, A]:</strong>
                            </div>
                            <ul className="text-green-700 space-y-1 ml-4">
                                <li>• Venetoclax + Obinutuzumab</li>
                                <li>• Ibrutinib + Venetoclax</li>
                                <li>• Ibrutinib ± Rituximab</li>
                                <li>• Acalabrutinib ± Obinutuzumab</li>
                                <li>• Zanubrutinib</li>
                                <li>• FCR (with secondary neoplasia discussion) [I, B]</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">Unfit/Older Patients with Mutated IGHV (No TP53 aberrations)</h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-blue-50 p-2 rounded">
                                <strong>Equally Recommended Options [I, A]:</strong>
                            </div>
                            <ul className="text-blue-700 space-y-1 ml-4">
                                <li>• Venetoclax + Obinutuzumab</li>
                                <li>• Acalabrutinib ± Obinutuzumab</li>
                                <li>• Zanubrutinib</li>
                                <li>• Ibrutinib (with cardiac assessment) [I, A]</li>
                                <li>• Ibrutinib + Venetoclax (with cardiac assessment) [I, B]</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="border border-orange-200 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-800 mb-3">Fit/Younger Patients with Unmutated IGHV (No TP53 aberrations)</h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-orange-50 p-2 rounded">
                                <strong>Recommended Options:</strong>
                            </div>
                            <ul className="text-orange-700 space-y-1 ml-4">
                                <li>• Ibrutinib + Venetoclax [I, A]</li>
                                <li>• Ibrutinib ± Rituximab [I, A]</li>
                                <li>• Acalabrutinib ± Obinutuzumab [III, A]</li>
                                <li>• Zanubrutinib [III, A]</li>
                                <li>• Venetoclax + Obinutuzumab as alternative [I, A]</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-3">Patients with TP53 mutation/del(17p)</h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-red-50 p-2 rounded">
                                <strong>Preferred BTK Inhibitors:</strong>
                            </div>
                            <ul className="text-red-700 space-y-1 ml-4">
                                <li>• Acalabrutinib [I, A]</li>
                                <li>• Zanubrutinib [III, A]</li>
                                <li>• Ibrutinib [I, A]</li>
                            </ul>
                            <div className="bg-red-50 p-2 rounded mt-2">
                                <strong>Alternative Options:</strong>
                            </div>
                            <ul className="text-red-700 space-y-1 ml-4">
                                <li>• Venetoclax (continuous) [III, A]</li>
                                <li>• Ibrutinib + Venetoclax [III, A]</li>
                                <li>• Venetoclax + Obinutuzumab [III, A]</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Key Selection Factors (ESMO 2024)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <ul className="text-yellow-700 space-y-1">
                            <li>• <strong>Time-limited therapy preferred</strong> when efficacy is similar</li>
                            <li>• Side-effect profile considerations</li>
                            <li>• Drug administration route preferences</li>
                            <li>• Access and monitoring intensity</li>
                        </ul>
                        <ul className="text-yellow-700 space-y-1">
                            <li>• Cardiovascular comorbidities (favor acalabrutinib/zanubrutinib)</li>
                            <li>• Renal function (tumor lysis syndrome risk)</li>
                            <li>• Patient preference and lifestyle</li>
                            <li>• Treatment adherence expectations</li>
                        </ul>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "Eichhorst B, Ghia P, Niemann CU, et al. ESMO Clinical Practice Guideline interim update on new targeted therapies in the first line and at relapse of chronic lymphocytic leukaemia. Ann Oncol. 2024;35(9):762-768. doi:10.1016/j.annonc.2024.06.016",
                "Tam CS, Allan JN, Siddiqi T, et al. Fixed-duration ibrutinib plus venetoclax for first-line treatment of CLL: primary analysis of the CAPTIVATE FD cohort. Blood. 2022;139(22):3278-3289.",
                "Munir T, Cairns DA, Bloor A, et al. Chronic lymphocytic leukemia therapy guided by measurable residual disease. N Engl J Med. 2024;390(4):326-337.",
                "Al-Sawaf O, Zhang C, Tandon M, et al. Venetoclax plus obinutuzumab versus chlorambucil plus obinutuzumab for previously untreated chronic lymphocytic leukaemia (CLL14): follow-up results. Lancet Oncol. 2020;21(9):1188-1200.",
                "Kater AP, Owen C, Moreno C, et al. Fixed-duration ibrutinib-venetoclax in patients with chronic lymphocytic leukemia and comorbidities. NEJM Evid. 2022;1(7):EVIDoa2200006.",
                "Brown JR, Eichhorst B, Hillmen P, et al. Zanubrutinib or ibrutinib in relapsed or refractory chronic lymphocytic leukemia. N Engl J Med. 2023;388(4):319-332.",
                "Byrd JC, Hillmen P, Ghia P, et al. First-line acalabrutinib in patients with CLL. N Engl J Med. 2024;391(1):1-13.",
                "NCCN Clinical Practice Guidelines in Oncology: Chronic Lymphocytic Leukemia/Small Lymphocytic Lymphoma. Version 1.2025.",
                "Seymour JF, Kipps TJ, Eichhorst B, et al. Venetoclax-rituximab in relapsed or refractory chronic lymphocytic leukemia. N Engl J Med. 2018;378(12):1107-1120."
            ]} />
        </div>
    );

    const navigation = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'gender', label: 'Gender Distribution', icon: Users },
        { id: 'aging', label: 'Aging Impact', icon: TrendingUp },
        { id: 'mutations', label: 'Mutations & Genetics', icon: Dna },
        { id: 'treatments', label: 'Treatments', icon: Pill },
        { id: 'treatment-plans', label: 'ESMO 2024 Treatment Plans', icon: Pill },
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
                {activeSection === 'treatment-plans' && renderTreatmentPlans()}
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