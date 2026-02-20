export interface FormItem {
  id: number;
  name: string;
  category: string;
  description: string;
  downloadUrl: string;
  fileType: string;
}

export const categories = [
  "Tax & IRS",
  "Immigration",
  "Business",
  "Employment",
  "Legal",
  "Healthcare",
  "Real Estate",
  "Government",
  "Education",
  "Personal",
];

export const forms: FormItem[] = [
  // Tax & IRS
  { id: 1, name: "IRS Form W-9", category: "Tax & IRS", description: "Request for Taxpayer Identification Number and Certification", downloadUrl: "https://www.irs.gov/pub/irs-pdf/fw9.pdf", fileType: "PDF" },
  { id: 2, name: "IRS Form W-4", category: "Tax & IRS", description: "Employee's Withholding Certificate", downloadUrl: "https://www.irs.gov/pub/irs-pdf/fw4.pdf", fileType: "PDF" },
  { id: 3, name: "IRS Form 1040", category: "Tax & IRS", description: "U.S. Individual Income Tax Return", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1040.pdf", fileType: "PDF" },
  { id: 4, name: "IRS Form 1099-MISC", category: "Tax & IRS", description: "Miscellaneous Information", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1099msc.pdf", fileType: "PDF" },
  { id: 5, name: "IRS Form 1099-NEC", category: "Tax & IRS", description: "Nonemployee Compensation", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1099nec.pdf", fileType: "PDF" },
  { id: 6, name: "IRS Form W-2", category: "Tax & IRS", description: "Wage and Tax Statement", downloadUrl: "https://www.irs.gov/pub/irs-pdf/fw2.pdf", fileType: "PDF" },
  { id: 7, name: "IRS Form 941", category: "Tax & IRS", description: "Employer's Quarterly Federal Tax Return", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f941.pdf", fileType: "PDF" },

  // Immigration
  { id: 8, name: "USCIS Form I-9", category: "Immigration", description: "Employment Eligibility Verification", downloadUrl: "https://www.uscis.gov/sites/default/files/document/forms/i-9.pdf", fileType: "PDF" },
  { id: 9, name: "USCIS Form I-130", category: "Immigration", description: "Petition for Alien Relative", downloadUrl: "https://www.uscis.gov/sites/default/files/document/forms/i-130.pdf", fileType: "PDF" },
  { id: 10, name: "USCIS Form N-400", category: "Immigration", description: "Application for Naturalization", downloadUrl: "https://www.uscis.gov/sites/default/files/document/forms/n-400.pdf", fileType: "PDF" },
  { id: 11, name: "USCIS Form I-485", category: "Immigration", description: "Application to Register Permanent Residence", downloadUrl: "https://www.uscis.gov/sites/default/files/document/forms/i-485.pdf", fileType: "PDF" },
  { id: 12, name: "USCIS Form I-20", category: "Immigration", description: "Certificate of Eligibility for Student Status", downloadUrl: "https://www.ice.gov/doclib/sevis/pdf/i-20.pdf", fileType: "PDF" },

  // Business
  { id: 13, name: "IRS Form SS-4", category: "Business", description: "Application for Employer Identification Number (EIN)", downloadUrl: "https://www.irs.gov/pub/irs-pdf/fss4.pdf", fileType: "PDF" },
  { id: 14, name: "IRS Form 1065", category: "Business", description: "U.S. Return of Partnership Income", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1065.pdf", fileType: "PDF" },
  { id: 15, name: "IRS Form 1120-S", category: "Business", description: "U.S. Income Tax Return for an S Corporation", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1120s.pdf", fileType: "PDF" },
  { id: 16, name: "IRS Form 1120", category: "Business", description: "U.S. Corporation Income Tax Return", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1120.pdf", fileType: "PDF" },
  { id: 17, name: "SBA Form 1919", category: "Business", description: "SBA Borrower Information Form", downloadUrl: "https://www.sba.gov/sites/default/files/2023-03/SBA-Form-1919-Borrower-Information-Form-508.pdf", fileType: "PDF" },

  // Employment
  { id: 18, name: "IRS Form W-4P", category: "Employment", description: "Withholding Certificate for Periodic Pension or Annuity Payments", downloadUrl: "https://www.irs.gov/pub/irs-pdf/fw4p.pdf", fileType: "PDF" },
  { id: 19, name: "IRS Form 8850", category: "Employment", description: "Pre-Screening Notice and Certification Request for WOTC", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f8850.pdf", fileType: "PDF" },
  { id: 20, name: "DOL Form WH-347", category: "Employment", description: "Payroll (For Contractor Use)", downloadUrl: "https://www.dol.gov/sites/dolgov/files/WHD/legacy/files/wh347.pdf", fileType: "PDF" },
  { id: 21, name: "OSHA Form 300", category: "Employment", description: "Log of Work-Related Injuries and Illnesses", downloadUrl: "https://www.osha.gov/sites/default/files/OSHA-RK-Forms-Package.pdf", fileType: "PDF" },
  { id: 22, name: "IRS Form 940", category: "Employment", description: "Employer's Annual Federal Unemployment (FUTA) Tax Return", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f940.pdf", fileType: "PDF" },

  // Legal
  { id: 23, name: "General Power of Attorney", category: "Legal", description: "Legal document granting authority to act on behalf of another", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f2848.pdf", fileType: "PDF" },
  { id: 24, name: "IRS Form 2848", category: "Legal", description: "Power of Attorney and Declaration of Representative", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f2848.pdf", fileType: "PDF" },
  { id: 25, name: "IRS Form 8821", category: "Legal", description: "Tax Information Authorization", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f8821.pdf", fileType: "PDF" },
  { id: 26, name: "IRS Form 4506-T", category: "Legal", description: "Request for Transcript of Tax Return", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f4506t.pdf", fileType: "PDF" },
  { id: 27, name: "IRS Form 14039", category: "Legal", description: "Identity Theft Affidavit", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f14039.pdf", fileType: "PDF" },

  // Healthcare
  { id: 28, name: "CMS Form 1500", category: "Healthcare", description: "Health Insurance Claim Form", downloadUrl: "https://www.cms.gov/medicare/cms-forms/cms-forms/downloads/cms1500.pdf", fileType: "PDF" },
  { id: 29, name: "HIPAA Authorization Form", category: "Healthcare", description: "Authorization for Release of Health Information", downloadUrl: "https://www.hhs.gov/sites/default/files/hipaa-simplification-201303.pdf", fileType: "PDF" },
  { id: 30, name: "IRS Form 1095-A", category: "Healthcare", description: "Health Insurance Marketplace Statement", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1095a.pdf", fileType: "PDF" },
  { id: 31, name: "IRS Form 8962", category: "Healthcare", description: "Premium Tax Credit", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f8962.pdf", fileType: "PDF" },
  { id: 32, name: "SSA Form SSA-1", category: "Healthcare", description: "Social Security Benefit Statement", downloadUrl: "https://www.ssa.gov/forms/ssa-1-bk.pdf", fileType: "PDF" },

  // Real Estate
  { id: 33, name: "HUD-1 Settlement Statement", category: "Real Estate", description: "Real Estate Settlement Procedures Act Statement", downloadUrl: "https://www.hud.gov/sites/documents/1.PDF", fileType: "PDF" },
  { id: 34, name: "IRS Form 8283", category: "Real Estate", description: "Noncash Charitable Contributions", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f8283.pdf", fileType: "PDF" },
  { id: 35, name: "IRS Form 4797", category: "Real Estate", description: "Sales of Business Property", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f4797.pdf", fileType: "PDF" },
  { id: 36, name: "IRS Schedule E", category: "Real Estate", description: "Supplemental Income and Loss (Rental Real Estate)", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1040se.pdf", fileType: "PDF" },
  { id: 37, name: "IRS Form 1098", category: "Real Estate", description: "Mortgage Interest Statement", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1098.pdf", fileType: "PDF" },

  // Government
  { id: 38, name: "SF-86", category: "Government", description: "Questionnaire for National Security Positions", downloadUrl: "https://www.opm.gov/forms/pdf_fill/sf86.pdf", fileType: "PDF" },
  { id: 39, name: "SF-180", category: "Government", description: "Request Pertaining to Military Records", downloadUrl: "https://www.archives.gov/files/research/order/standard-form-180.pdf", fileType: "PDF" },
  { id: 40, name: "DS-11", category: "Government", description: "Application for U.S. Passport", downloadUrl: "https://eforms.state.gov/Forms/ds11.pdf", fileType: "PDF" },
  { id: 41, name: "DS-82", category: "Government", description: "U.S. Passport Renewal Application", downloadUrl: "https://eforms.state.gov/Forms/ds82.pdf", fileType: "PDF" },
  { id: 42, name: "VA Form 10-10EZ", category: "Government", description: "Application for Health Benefits", downloadUrl: "https://www.va.gov/vaforms/medical/pdf/VA-Form-10-10EZ.pdf", fileType: "PDF" },

  // Education
  { id: 43, name: "FAFSA Application", category: "Education", description: "Free Application for Federal Student Aid", downloadUrl: "https://studentaid.gov/sites/default/files/2024-25-fafsa.pdf", fileType: "PDF" },
  { id: 44, name: "IRS Form 8863", category: "Education", description: "Education Credits (American Opportunity and Lifetime Learning)", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f8863.pdf", fileType: "PDF" },
  { id: 45, name: "IRS Form 1098-T", category: "Education", description: "Tuition Statement", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1098t.pdf", fileType: "PDF" },
  { id: 46, name: "IRS Form 1098-E", category: "Education", description: "Student Loan Interest Statement", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f1098e.pdf", fileType: "PDF" },

  // Personal
  { id: 47, name: "SSA Form SS-5", category: "Personal", description: "Application for a Social Security Card", downloadUrl: "https://www.ssa.gov/forms/ss-5.pdf", fileType: "PDF" },
  { id: 48, name: "IRS Form 8822", category: "Personal", description: "Change of Address", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f8822.pdf", fileType: "PDF" },
  { id: 49, name: "IRS Form 4868", category: "Personal", description: "Application for Automatic Extension of Time to File", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f4868.pdf", fileType: "PDF" },
  { id: 50, name: "IRS Form 709", category: "Personal", description: "United States Gift Tax Return", downloadUrl: "https://www.irs.gov/pub/irs-pdf/f709.pdf", fileType: "PDF" },
];
