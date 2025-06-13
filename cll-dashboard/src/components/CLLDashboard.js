import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { Calendar, Users, TrendingUp, Pill, Activity, ChevronDown, ChevronUp, Info } from 'lucide-react';

const CLLDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedCard, setExpandedCard] = useState(null);

    // Data for UK incidence
    const ukIncidenceData = [
        { year: '1993-1995', male: 100, female: 100 },
        { year: '2000-2002', male: 105, female: 106 },
        { year: '2007-2009', male: 108, female: 110 },
        { year: '2010-2012', male: 107, female: 112 },
        { year: '2017-2019', male: 109, female: 114 }
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

    // Drug efficacy data
    const drugEfficacyData = [
        { name: 'Ibrutinib + Venetoclax', PFS: 90, CR: 88, uMRD: 72 },
        { name: 'Acalabrutinib + V + O', PFS: 83, CR: 75, uMRD: 65 },
        { name: 'Venetoclax + Obinutuzumab', PFS: 78, CR: 70, uMRD: 60 },
        { name: 'Zanubrutinib', PFS: 85, CR: 68, uMRD: 45 },
        { name: 'FCR (Chemo)', PFS: 65, CR: 55, uMRD: 40 }
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
                <h3 className="text-xl font-bold mb-4">UK CLL Incidence Trends (Indexed to 1993-1995 = 100)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ukIncidenceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="male" stroke="#3B82F6" strokeWidth={3} name="Male" />
                        <Line type="monotone" dataKey="female" stroke="#EC4899" strokeWidth={3} name="Female" />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 mt-2">
                    Since the early 1990s, CLL incidence has increased by 14% in females and 9% in males in the UK.
                </p>
            </div>
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
                    <h3 className="text-xl font-bold mb-4">Drug Efficacy Comparison</h3>
                    <div className="space-y-3">
                        {drugEfficacyData.map((drug, index) => (
                            <div key={index} className="border rounded-lg p-3">
                                <h4 className="font-semibold text-sm mb-2">{drug.name}</h4>
                                <div className="space-y-1">
                                    <div className="flex items-center">
                                        <span className="text-xs w-16">PFS:</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${drug.PFS}%` }}></div>
                                        </div>
                                        <span className="text-xs font-medium">{drug.PFS}%</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-xs w-16">CR:</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${drug.CR}%` }}></div>
                                        </div>
                                        <span className="text-xs font-medium">{drug.CR}%</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-xs w-16">uMRD:</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${drug.uMRD}%` }}></div>
                                        </div>
                                        <span className="text-xs font-medium">{drug.uMRD}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                        PFS: Progression-Free Survival, CR: Complete Response, uMRD: Undetectable Minimal Residual Disease
                    </p>
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
        </div>
    );

    const navigation = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'gender', label: 'Gender Distribution', icon: Users },
        { id: 'aging', label: 'Aging Impact', icon: TrendingUp },
        { id: 'treatments', label: 'Treatments', icon: Pill }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Chronic Lymphocytic Leukemia Statistics
                    </h1>
                    <p className="text-blue-100 text-lg">
                        UK Focus with International Comparisons • 2025 Data
                    </p>
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
                {activeSection === 'treatments' && renderTreatments()}
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