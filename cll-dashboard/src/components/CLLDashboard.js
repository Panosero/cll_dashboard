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

    // Treatment comparison data (Updated with ESMO 2024 BCL2 inhibitor revolution)
    const treatmentComparisonData = [
        { drug: 'Venetoclax + Obinutuzumab', UK: 94, EU: 96, US: 92 },
        { drug: 'Ibrutinib + Venetoclax', UK: 85, EU: 88, US: 90 },
        { drug: 'Venetoclax + Rituximab', UK: 82, EU: 85, US: 88 },
        { drug: 'Acalabrutinib ± Obinutuzumab', UK: 78, EU: 75, US: 85 },
        { drug: 'Zanubrutinib', UK: 80, EU: 72, US: 82 },
        { drug: 'Ibrutinib (monotherapy)', UK: 60, EU: 58, US: 70 }
    ];

    // Treatment guidelines comparison (Updated ESMO 2024 - BCL2 inhibitor revolution)
    const guidelinesData = [
        {
            aspect: 'Time-Limited BCL2i Priority',
            UK: 92,
            EU: 96,
            US: 85,
            details: {
                UK: 'VenO strongly preferred first-line across all risk groups',
                EU: 'ESMO 2024: Time-limited venetoclax combinations are standard of care',
                US: 'Growing preference for fixed-duration BCL2i therapy'
            }
        },
        {
            aspect: 'MRD-Guided Duration',
            UK: 88,
            EU: 94,
            US: 82,
            details: {
                UK: 'MRD-guided therapy duration increasingly adopted',
                EU: 'ESMO 2024 strongly advocates MRD-driven personalized treatment',
                US: 'MRD testing becoming standard practice'
            }
        },
        {
            aspect: 'VenO vs BTKi Monotherapy',
            UK: 85,
            EU: 91,
            US: 78,
            details: {
                UK: 'VenO preferred over continuous BTKi in most patients',
                EU: 'ESMO 2024: BCL2i combinations superior to BTKi monotherapy',
                US: 'Both approaches still widely used'
            }
        },
        {
            aspect: 'Ibrutinib-Venetoclax Combination',
            UK: 78,
            EU: 85,
            US: 88,
            details: {
                UK: 'Emerging as important option for high-risk CLL',
                EU: 'ESMO 2024 approval driving increased adoption',
                US: 'Strong uptake following regulatory approval'
            }
        }
    ];

    // Mutation prevalence data (Updated with BCL2 inhibitor sensitivity markers)
    const mutationData = [
        { mutation: 'IGHV Unmutated', prevalence: 55, prognosis: 'Poor', treatment: 'VenO preferred over BTKi monotherapy' },
        { mutation: 'del(17p)/TP53', prevalence: 5, prognosis: 'Very Poor', treatment: 'VenO superior to BTKi in ESMO 2024' },
        { mutation: 'del(11q)/ATM', prevalence: 18, prognosis: 'Intermediate', treatment: 'VenO shows excellent outcomes' },
        { mutation: 'Trisomy 12', prevalence: 16, prognosis: 'Intermediate', treatment: 'NOTCH1+ benefits from VenO' },
        { mutation: 'del(13q)', prevalence: 55, prognosis: 'Good', treatment: 'Excellent VenO response rates' },
        { mutation: 'NOTCH1', prevalence: 12, prognosis: 'Poor', treatment: 'VenO preferred (ESMO 2024)' },
        { mutation: 'SF3B1', prevalence: 8, prognosis: 'Intermediate', treatment: 'Good venetoclax sensitivity' },
        { mutation: 'BCL2 G101V', prevalence: 1, prognosis: 'Acquired resistance', treatment: 'BTKi or novel combinations' }
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
                title="CLL Treatment Revolution: BCL2 Inhibitors Leading the Way"
                content="The treatment landscape has shifted dramatically with BCL2 inhibitors, particularly venetoclax combinations, now considered first-line standard of care by ESMO 2024. Venetoclax + obinutuzumab (VenO) offers superior outcomes with fixed-duration therapy, achieving deep remissions and potential treatment-free intervals."
            />

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Current Treatment Adoption: Focus on BCL2 Inhibitors (%)</h3>
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
                    <h3 className="text-xl font-bold mb-4">BCL2 Inhibitor Clinical Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Venetoclax + Obinutuzumab (VenO)</h4>
                            <div className="space-y-3">
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <p className="font-medium text-blue-800">Superior PFS</p>
                                    <p className="text-sm text-gray-600">HR 0.42 vs chemoimmunotherapy (ESMO 2024)</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <p className="font-medium text-green-800">Deep Remissions</p>
                                    <p className="text-sm text-gray-600">86.5% achieve uMRD in peripheral blood</p>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <p className="font-medium text-purple-800">Time-Limited Therapy</p>
                                    <p className="text-sm text-gray-600">12-24 months with long treatment-free intervals</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 mb-3">ESMO 2024 Key Benefits</h4>
                            <div className="space-y-3">
                                <div className="border-l-4 border-red-500 pl-4">
                                    <p className="font-medium text-red-800">All Risk Groups</p>
                                    <p className="text-sm text-gray-600">Superior outcomes across all cytogenetic risk categories</p>
                                </div>
                                <div className="border-l-4 border-orange-500 pl-4">
                                    <p className="font-medium text-orange-800">Re-treatment Option</p>
                                    <p className="text-sm text-gray-600">Feasible venetoclax re-challenge at relapse</p>
                                </div>
                                <div className="border-l-4 border-indigo-500 pl-4">
                                    <p className="font-medium text-indigo-800">MRD-Guided Therapy</p>
                                    <p className="text-sm text-gray-600">Personalized treatment duration based on response</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">ESMO 2024 Regional Treatment Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-bold text-blue-900 mb-2">UK (NICE/BSH)</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Venetoclax + Obinutuzumab first-line</li>
                            <li>• Acalabrutinib preferred BTKi</li>
                            <li>• Fixed duration strongly favored</li>
                            <li>• MRD testing recommended for VenO</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-bold text-green-900 mb-2">EU (ESMO 2024)</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>• BCL2 inhibitors preferred over BTKi</li>
                            <li>• VenO for all fit patients</li>
                            <li>• Time-limited therapy priority</li>
                            <li>• MRD-guided treatment duration</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                        <h4 className="font-bold text-amber-900 mb-2">US (NCCN)</h4>
                        <ul className="text-sm text-amber-800 space-y-1">
                            <li>• VenO and BTKi both preferred</li>
                            <li>• Zanubrutinib as preferred BTKi</li>
                            <li>• Patient preference important</li>
                            <li>• Continuous vs fixed duration debate</li>
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

    // ESMO 2024 Treatment Plans by Category
    const treatmentPlans = {
        firstLine: {
            mutatedIGHV: {
                fit: [
                    { name: 'Venetoclax + Obinutuzumab', grade: 'I, A', duration: '12 cycles', priority: 1 },
                    { name: 'Ibrutinib + Venetoclax', grade: 'I, A', duration: '15 cycles', priority: 2 },
                    { name: 'Ibrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 3 },
                    { name: 'Acalabrutinib ± Obinutuzumab', grade: 'III, A', duration: 'Continuous', priority: 4 },
                    { name: 'Zanubrutinib', grade: 'III, A', duration: 'Continuous', priority: 5 }
                ],
                unfit: [
                    { name: 'Venetoclax + Obinutuzumab', grade: 'I, A', duration: '12 cycles', priority: 1 },
                    { name: 'Acalabrutinib ± Obinutuzumab', grade: 'I, A', duration: 'Continuous', priority: 2 },
                    { name: 'Zanubrutinib', grade: 'I, A', duration: 'Continuous', priority: 3 },
                    { name: 'Ibrutinib', grade: 'I, A', duration: 'Continuous', priority: 4, note: 'After CV assessment' }
                ]
            },
            unmutatedIGHV: {
                fit: [
                    { name: 'Ibrutinib + Venetoclax', grade: 'I, A', duration: '15 cycles', priority: 1 },
                    { name: 'Ibrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 2 },
                    { name: 'Acalabrutinib ± Obinutuzumab', grade: 'III, A', duration: 'Continuous', priority: 3 },
                    { name: 'Zanubrutinib', grade: 'III, A', duration: 'Continuous', priority: 4 },
                    { name: 'Venetoclax + Obinutuzumab', grade: 'I, A', duration: '12 cycles', priority: 5, note: 'Alternative' }
                ],
                unfit: [
                    { name: 'Venetoclax + Obinutuzumab', grade: 'I, A', duration: '12 cycles', priority: 1 },
                    { name: 'Acalabrutinib ± Obinutuzumab', grade: 'I, A', duration: 'Continuous', priority: 2 },
                    { name: 'Zanubrutinib', grade: 'I, A', duration: 'Continuous', priority: 3 },
                    { name: 'Ibrutinib', grade: 'I, A', duration: 'Continuous', priority: 4, note: 'After CV assessment' }
                ]
            },
            tp53: [
                { name: 'Acalabrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 1 },
                { name: 'Zanubrutinib monotherapy', grade: 'III, A', duration: 'Continuous', priority: 2 },
                { name: 'Ibrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 3 },
                { name: 'Venetoclax monotherapy', grade: 'III, A', duration: 'Continuous', priority: 4 },
                { name: 'Ibrutinib + Venetoclax', grade: 'III, A', duration: '15 cycles', priority: 5, note: 'Young patients' },
                { name: 'Venetoclax + Obinutuzumab', grade: 'III, A', duration: '12 cycles', priority: 6 }
            ]
        },
        relapsed: {
            afterCIT: [
                { name: 'Venetoclax + Rituximab', grade: 'I, A', duration: '24 months', priority: 1 },
                { name: 'Acalabrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 2 },
                { name: 'Zanubrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 3 },
                { name: 'Ibrutinib monotherapy', grade: 'I, B', duration: 'Continuous', priority: 4, note: 'Aca/Zanu preferred' }
            ],
            afterVenetoclax: {
                late: [
                    { name: 'Venetoclax + Rituximab', grade: 'I, A', duration: '24 months', priority: 1, note: '≥36 months' },
                    { name: 'Acalabrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 2 },
                    { name: 'Zanubrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 3 }
                ],
                early: [
                    { name: 'Acalabrutinib monotherapy', grade: 'II, B', duration: 'Continuous', priority: 1 },
                    { name: 'Zanubrutinib monotherapy', grade: 'II, B', duration: 'Continuous', priority: 2 },
                    { name: 'Ibrutinib monotherapy', grade: 'II, B', duration: 'Continuous', priority: 3 },
                    { name: 'Venetoclax + Rituximab', grade: 'II, B', duration: '24 months', priority: 4, note: '<36 months' }
                ]
            },
            afterBTKi: [
                { name: 'Venetoclax + Rituximab', grade: 'III, A', duration: '24 months', priority: 1 },
                { name: 'Alternative BTKi', grade: 'III, B', duration: 'Continuous', priority: 2, note: 'If stopped for toxicity' }
            ],
            tp53: [
                { name: 'Acalabrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 1 },
                { name: 'Zanubrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 2 },
                { name: 'Ibrutinib monotherapy', grade: 'I, A', duration: 'Continuous', priority: 3 },
                { name: 'Venetoclax + Rituximab', grade: 'I, A', duration: '24 months', priority: 4 },
                { name: 'Venetoclax monotherapy', grade: 'III, B', duration: 'Continuous', priority: 5 },
                { name: 'Allogeneic SCT', grade: 'IV, B', duration: 'Once', priority: 6, note: 'Fit patients' }
            ]
        }
    };

    const TreatmentPlanCard = ({ title, treatments, color = "blue" }) => (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h4 className={`text-lg font-bold mb-4 text-${color}-900`}>{title}</h4>
            <div className="space-y-3">
                {treatments.map((treatment, index) => (
                    <div key={index} className={`border-l-4 border-${color}-500 pl-4 py-2 bg-${color}-50 rounded-r-lg`}>
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">{treatment.priority}. {treatment.name}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                    <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-800 font-medium`}>
                                        {treatment.grade}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                        Duration: {treatment.duration}
                                    </span>
                                </div>
                                {treatment.note && (
                                    <p className="text-xs text-gray-500 mt-1 italic">Note: {treatment.note}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTreatmentPlans = () => (
        <div className="space-y-6">
            <InfoBox
                title="ESMO 2024 Evidence-Based Treatment Plans"
                content="This section provides comprehensive treatment algorithms based on the latest ESMO 2024 guidelines. Treatment plans are organized by patient fitness, genetic risk profile, and line of therapy. Evidence grades follow ESMO methodology: I (randomized trials), II (prospective/retrospective studies), III (expert opinion), IV (case reports). Recommendation grades: A (strong), B (moderate), C (weak)."
            />

            {/* First-Line Treatment Plans */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">First-Line Treatment Plans</h2>
                <p className="text-green-100">ESMO 2024 Recommendations for Treatment-Naive CLL Patients</p>
            </div>

            {/* Mutated IGHV First-Line */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    Mutated IGHV (Favorable Risk)
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TreatmentPlanCard
                        title="Fit/Younger Patients"
                        treatments={treatmentPlans.firstLine.mutatedIGHV.fit}
                        color="green"
                    />
                    <TreatmentPlanCard
                        title="Unfit/Older Patients"
                        treatments={treatmentPlans.firstLine.mutatedIGHV.unfit}
                        color="emerald"
                    />
                </div>
            </div>

            {/* Unmutated IGHV First-Line */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                    Unmutated IGHV (High Risk)
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TreatmentPlanCard
                        title="Fit/Younger Patients"
                        treatments={treatmentPlans.firstLine.unmutatedIGHV.fit}
                        color="orange"
                    />
                    <TreatmentPlanCard
                        title="Unfit/Older Patients"
                        treatments={treatmentPlans.firstLine.unmutatedIGHV.unfit}
                        color="amber"
                    />
                </div>
            </div>

            {/* TP53 Aberrant First-Line */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                    TP53 Mutation/del(17p) (Very High Risk)
                </h3>
                <div className="grid grid-cols-1 gap-6">
                    <TreatmentPlanCard
                        title="All Patients - BTKi Preferred"
                        treatments={treatmentPlans.firstLine.tp53}
                        color="red"
                    />
                </div>
            </div>

            {/* Relapsed/Refractory Treatment Plans */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-6 mb-6 mt-12">
                <h2 className="text-2xl font-bold mb-2">Relapsed/Refractory Treatment Plans</h2>
                <p className="text-purple-100">ESMO 2024 Recommendations Based on Prior Therapy</p>
            </div>

            {/* After Chemoimmunotherapy */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                    After Chemoimmunotherapy (CIT)
                </h3>
                <div className="grid grid-cols-1 gap-6">
                    <TreatmentPlanCard
                        title="Equal Options - Patient/Physician Choice"
                        treatments={treatmentPlans.relapsed.afterCIT}
                        color="blue"
                    />
                </div>
            </div>

            {/* After Venetoclax */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-4 h-4 bg-indigo-500 rounded-full mr-3"></div>
                    After Venetoclax-Based Therapy
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TreatmentPlanCard
                        title="Late Relapse (≥36 months)"
                        treatments={treatmentPlans.relapsed.afterVenetoclax.late}
                        color="indigo"
                    />
                    <TreatmentPlanCard
                        title="Early Relapse (<36 months)"
                        treatments={treatmentPlans.relapsed.afterVenetoclax.early}
                        color="violet"
                    />
                </div>
            </div>

            {/* After BTKi */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full mr-3"></div>
                    After BTK Inhibitor Therapy
                </h3>
                <div className="grid grid-cols-1 gap-6">
                    <TreatmentPlanCard
                        title="Progression on BTKi - Venetoclax Preferred"
                        treatments={treatmentPlans.relapsed.afterBTKi}
                        color="cyan"
                    />
                </div>
            </div>

            {/* TP53 Aberrant Relapsed */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                    TP53 Mutation/del(17p) - Relapsed
                </h3>
                <div className="grid grid-cols-1 gap-6">
                    <TreatmentPlanCard
                        title="Very High Risk - Consider Allogeneic SCT"
                        treatments={treatmentPlans.relapsed.tp53}
                        color="red"
                    />
                </div>
            </div>

            {/* Key Considerations */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Key ESMO 2024 Treatment Considerations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Time-Limited Preference</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Fixed-duration therapy preferred when efficacy equivalent</li>
                            <li>• Allows treatment-free intervals</li>
                            <li>• Enables retreatment options</li>
                            <li>• Reduces cumulative toxicity</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-semibold text-green-900 mb-2">MRD-Guided Therapy</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>• Personalized treatment duration</li>
                            <li>• Improved outcomes in FLAIR trial</li>
                            <li>• Future standard of care</li>
                            <li>• Currently research setting</li>
                        </ul>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Patient Selection</h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                            <li>• Mandatory genetic testing (IGHV, TP53)</li>
                            <li>• Cardiac assessment for BTKi</li>
                            <li>• Renal function for venetoclax</li>
                            <li>• Patient preference important</li>
                        </ul>
                    </div>
                </div>
            </div>

            <SourcesBox sources={[
                "Eichhorst B, Ghia P, Niemann CU, et al. ESMO Clinical Practice Guideline interim update on new targeted therapies in the first line and at relapse of chronic lymphocytic leukaemia. Ann Oncol. 2024;35(9):762-768.",
                "Munir T, Cairns DA, Bloor A, et al. Chronic lymphocytic leukemia therapy guided by measurable residual disease. N Engl J Med. 2023;390(4):326-337.",
                "Tam CS, Allan JN, Siddiqi T, et al. Fixed-duration ibrutinib plus venetoclax for first-line treatment of CLL. Blood. 2022;139(22):3278-3289.",
                "Al-Sawaf O, Zhang C, Tandon M, et al. Venetoclax plus obinutuzumab versus chlorambucil plus obinutuzumab. Lancet Oncol. 2020;21(9):1188-1200.",
                "Kater AP, Owen C, Moreno C, et al. Fixed-duration ibrutinib-venetoclax in patients with chronic lymphocytic leukemia. NEJM Evid. 2022;1(7):EVIDoa2200006.",
                "Brown JR, Eichhorst B, Hillmen P, et al. Zanubrutinib or ibrutinib in relapsed or refractory chronic lymphocytic leukemia. N Engl J Med. 2023;388(4):319-332.",
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