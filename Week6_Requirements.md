# Week 6: Request Submission Interface

## Overview
This week focuses on building the disaster request submission form UI for Organization Staff. The request form is a critical interface that allows organizations to submit detailed information about disaster relief needs. This includes form design, validation, conditional logic based on disaster type, and API integration placeholders.

---

## Tasks

### 1. Design Request Form Structure
**Steps:**
- [ ] Define form fields based on disaster types
- [ ] Determine required vs. optional fields
- [ ] Design field grouping and sections
- [ ] Plan validation rules for each field
- [ ] Create form layout wireframe

**Form Sections:**

#### Basic Information
- **Request Title** (text, required, 3-100 characters)
- **Description** (textarea, required, 10-1000 characters)
- **Disaster Type** (dropdown, required)
  - Earthquake
  - Flood
  - Wildfire
  - Hurricane
  - Tornado
  - Other

#### Location Information
- **State/Region** (dropdown, required)
- **City** (text, optional)
- **Latitude** (number, optional, for map integration)
- **Longitude** (number, optional, for map integration)
- **Affected Area Size** (text, e.g., "500 sq km")

#### Request Details (Conditional based on Disaster Type)
**For Earthquake:**
- Magnitude range (dropdown)
- Building damage assessment (radio)
- Casualties estimate (number)

**For Flood:**
- Water level (text, e.g., "3 meters")
- Affected buildings count (number)
- Accessibility status (checkbox options)

**For Wildfire:**
- Burn area (text)
- Threat to populated areas (radio)
- Air quality impact (checkbox)

**For Hurricane/Tornado:**
- Wind speed (text)
- Damage severity (radio)
- Infrastructure impact (checkbox)

#### Resource Needs
- **Food & Water** (checkbox)
  - If checked: Estimated people (number)
  - If checked: Dietary requirements (text/textarea)
  
- **Medical Supplies** (checkbox)
  - If checked: Type of supplies needed (multi-select)
  - If checked: Hospital availability (radio)
  
- **Shelter** (checkbox)
  - If checked: Family count needed (number)
  - If checked: Special requirements (textarea)
  
- **Search & Rescue** (checkbox)
  - If checked: Missing persons count (number)
  - If checked: Search area description (textarea)
  
- **Other Resources** (text, optional)

#### Contact Information
- **Primary Contact Name** (text, required)
- **Contact Phone** (tel, required, format validation)
- **Contact Email** (email, required)
- **Backup Contact Name** (text, optional)
- **Backup Contact Phone** (tel, optional)

#### Priority & Urgency
- **Priority Level** (radio, required)
  - Critical (immediate response needed)
  - High (within 24 hours)
  - Medium (within 3 days)
  - Low (within 1 week)
  
- **Urgency Reason** (textarea, conditional - shown if Critical/High)
  - Required if Critical or High priority
  - 10-500 characters

#### Organization Information
- **Organization Name** (auto-filled from auth context)
- **Organization Type** (auto-filled from auth context)
- **Authorized By** (name, required, different from contact)
- **Authorization Date** (date picker, required)

---

### 2. Create Request Form Component
**Steps:**
- [ ] Build main RequestForm component with form state management
- [ ] Implement multi-step form or single-page form with sections
- [ ] Create form validation on field blur and submit
- [ ] Implement conditional field rendering based on disaster type
- [ ] Add real-time error message display
- [ ] Implement unsaved changes warning
- [ ] Add form reset functionality

**Component Structure:**
```
RequestForm/
├── RequestForm.jsx (main component)
├── FormSection.jsx (reusable section wrapper with title/description)
├── FormField.jsx (reusable field wrapper with label/error)
├── DisasterTypeSelector.jsx (disaster type selection with icons)
├── ResourceNeedsSection.jsx (checkbox group for resources)
├── ContactInfoSection.jsx (contact fields with validation)
├── PrioritySelector.jsx (priority level with urgency details)
└── RequestForm.css (styling)
```

---

### 3. Implement Form Validation Rules
**Steps:**
- [ ] Create validation utility functions for request form
- [ ] Implement field-level validation on blur
- [ ] Implement form-level validation on submit
- [ ] Create conditional required field logic
- [ ] Add real-time feedback for validation errors
- [ ] Show validation success indicators

**Validation Rules:**

| Field | Rule | Message |
|-------|------|---------|
| Request Title | 3-100 chars | "Title must be 3-100 characters" |
| Description | 10-1000 chars | "Description must be 10-1000 characters" |
| Disaster Type | Required | "Please select a disaster type" |
| State/Region | Required | "Please select a state or region" |
| Contact Phone | Valid phone format | "Please enter a valid phone number" |
| Contact Email | Valid email | "Please enter a valid email address" |
| Priority Reason | Required if Critical/High | "Please explain the urgency" |
| Affected Area Size | If provided, numeric format | "Must be a valid number" |
| Latitude/Longitude | If provided, valid coordinates | "Invalid geographic coordinates" |

---

### 4. Build Conditional Field Logic
**Steps:**
- [ ] Implement form state that tracks disaster type
- [ ] Show/hide fields based on disaster type selection
- [ ] Implement dependency logic (e.g., urgency reason only if Critical/High)
- [ ] Implement resource-specific subfields (e.g., food -> dietary requirements)
- [ ] Handle cascading validation for conditional fields
- [ ] Ensure form data consistency

**Conditional Logic Examples:**
```javascript
// Example: Show urgency reason only if priority is Critical or High
if (formData.priority === 'critical' || formData.priority === 'high') {
  showField('urgencyReason');
  setFieldRequired('urgencyReason', true);
} else {
  hideField('urgencyReason');
  setFieldRequired('urgencyReason', false);
}

// Example: Show disaster-type-specific fields
if (formData.disasterType === 'earthquake') {
  showFields(['magnitude', 'buildingDamage', 'casualties']);
}
```

---

### 5. Design User Experience Enhancements
**Steps:**
- [ ] Implement progress indicator for multi-section form
- [ ] Add helpful tooltips for complex fields
- [ ] Create clear visual hierarchy for required fields (*)
- [ ] Implement auto-save draft functionality
- [ ] Add confirmation dialog for leaving with unsaved changes
- [ ] Provide submission success/error feedback

**UX Features:**
- Form Progress: Show current section and total sections
- Required Indicator: Asterisk (*) with legend
- Field Tooltips: Hover for additional field information
- Error Summary: Show all validation errors at top and inline
- Success Message: Confirmation with request ID
- Draft Auto-Save: Save form data to localStorage every 30 seconds

---

### 6. Prepare API Integration Points
**Steps:**
- [ ] Define API endpoint for request submission
- [ ] Create request payload structure matching backend API
- [ ] Implement API call placeholder with proper error handling
- [ ] Add loading state during submission
- [ ] Handle validation errors from backend
- [ ] Implement success response handling

**API Integration Points:**

**POST /api/requests/submit**
```javascript
Request Payload:
{
  title: string,
  description: string,
  disasterType: string,
  location: {
    state: string,
    city: string,
    latitude: number,
    longitude: number,
    affectedAreaSize: string
  },
  disasterDetails: {
    // Varies by disaster type
  },
  resourceNeeds: {
    food: { needed: boolean, people: number, dietary: string },
    medical: { needed: boolean, supplies: [], hospitalAvailable: boolean },
    shelter: { needed: boolean, families: number, requirements: string },
    searchRescue: { needed: boolean, missing: number, description: string },
    other: string
  },
  contact: {
    primaryName: string,
    primaryPhone: string,
    primaryEmail: string,
    backupName: string,
    backupPhone: string
  },
  priority: string,
  urgencyReason: string,
  organizationId: string,
  authorizedBy: string,
  authorizationDate: date
}

Response:
{
  success: boolean,
  requestId: string,
  message: string,
  timestamp: date,
  status: "pending"
}
```

---

### 7. Create Styling and Responsive Design
**Steps:**
- [ ] Design form layout for desktop (single column)
- [ ] Implement responsive layout for tablet
- [ ] Implement responsive layout for mobile
- [ ] Create consistent styling with existing components
- [ ] Style validation feedback elements
- [ ] Style section separators and progress indicators
- [ ] Implement accessible form styling

**Responsive Breakpoints:**
- Desktop: Full form displayed (600px+)
- Tablet: Single column with adjusted spacing
- Mobile: Mobile optimized form with stacked fields and larger touch targets

---

## Deliverables

### 1. Request Form Component File
- **File:** `src/components/requests/RequestForm.jsx`
- **Features:**
  - Multi-section form with conditional logic
  - Form state management using useState
  - Real-time validation feedback
  - Unsaved changes warning
  - API integration placeholder

### 2. Supporting Components
- **File:** `src/components/requests/FormSection.jsx`
  - Reusable section wrapper
  
- **File:** `src/components/requests/DisasterTypeSelector.jsx`
  - Disaster type selection with icons
  
- **File:** `src/components/requests/ResourceNeedsSection.jsx`
  - Resource needs checkbox group with subfields

### 3. Validation Utilities
- **File:** `src/utils/requestValidation.js`
  - Validation functions for all request form fields
  - Conditional validation rules
  - Error message generation

### 4. Styling File
- **File:** `src/components/requests/RequestForm.css`
- **Features:**
  - Form section styling
  - Field layout and spacing
  - Validation feedback styling
  - Responsive design
  - Mobile-first approach

### 5. Request Service (API Placeholder)
- **File:** `src/services/requestService.js`
  - submitRequest() function with mocked API
  - Error handling
  - Request ID generation (for testing)

### 6. Page Component
- **File:** `src/pages/RequestSubmissionPage.jsx`
- **Features:**
  - Container for RequestForm
  - Navigation to/from form
  - Success/error message handling
  - Integration with main layout

---

## Success Criteria

- [x] Form displays all required fields
- [x] Validation rules work correctly on all fields
- [x] Conditional fields appear/disappear based on selections
- [x] Error messages display inline for invalid fields
- [x] Form data can be submitted with POST to API endpoint
- [x] Form resets after successful submission
- [x] Responsive design works on mobile, tablet, desktop
- [x] Unsaved changes warning displays when navigating away
- [x] Form accessible with keyboard navigation
- [x] Success message displays after submission with request ID

---

## Notes

- The request form is the most complex UI component built to date
- Conditional logic must be robust to handle all disaster types
- API integration should be mocked until backend is available
- Consider implementing multi-step form for better mobile UX
- Auto-save draft feature helps prevent data loss
- Request ID should be displayed for user reference
