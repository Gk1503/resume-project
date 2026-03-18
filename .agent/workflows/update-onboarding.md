---
description: Update onboarding flow to prioritize template selection
---

# Onboarding Flow Update Workflow

This workflow describes how to update the application to redirect users to a template selection page immediately after login, bypassing the home page and removing the manual "upload vs scratch" choice.

### 1. Update Login Redirection
In `src/Component/Navbar/Login.js`, update the `handleSubmit` success path:
- Change `navigate("/")` to `navigate("/DesginOne")`.

### 2. Add Global Template State
In `src/Component/Resume/Context/FormProvider.js`:
- Add `selectedTemplate` and `setSelectedTemplate` to the context.

### 3. Redesign DesignOne Page
Modify `src/Component/Resume/DesginMain/DesginOne/DesginOne.js`:
- Remove the "Yes, upload my resume" option.
- Implement a split-screen layout (`template-workspace`).
- Show template selection cards on the left.
- Show `LivePreviewMini` with `DUMMY_RESUME_DATA` on the right.

### 4. Enable Template Persistence in Preview
Update `src/Component/Resume/DesginMain/LivePreviewMini.js`:
- Make it accept a `data` prop for sample previews.
- Ensure it respects the `selectedTemplate` from context.

### 5. Add Dummy Data for Preview
Create `src/utils/dummyData.js` with a comprehensive resume object for template demonstrations.
