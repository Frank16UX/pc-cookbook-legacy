import { useState } from 'react';
import {
  CCBadge,
  CCNavigationPrimaryButton,
  CCNavigationSecondaryTabs,
  CCNavigationMain,
  Button,
  Card,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
} from './components';

type ComponentView = 'badge' | 'primary-button' | 'secondary-tabs' | 'navigation-main' | 'form-components';

function App() {
  const [currentView, setCurrentView] = useState<ComponentView>('form-components');
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [activePrimaryButton, setActivePrimaryButton] = useState<string>('');

  // Form component demo state
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(true);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');

  return (
    <div className="app-container" style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '2px solid #d3dede', paddingBottom: '1rem' }}>
        <h1 className="pc-heading-3" style={{ marginBottom: '1rem' }}>
          Pampered Chef Cookbook Components
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="component-select" style={{ fontSize: '14px', fontWeight: 'bold' }}>
            View Component:
          </label>
          <select
            id="component-select"
            value={currentView}
            onChange={(e) => setCurrentView(e.target.value as ComponentView)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #d3dede',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            <option value="form-components">Form Components (NEW)</option>
            <option value="badge">CC Badge</option>
            <option value="primary-button">CC Navigation Primary Button</option>
            <option value="secondary-tabs">CC Navigation Secondary Tabs</option>
            <option value="navigation-main">CC Navigation Main</option>
          </select>
        </div>
      </header>

      {currentView === 'form-components' && (
        <div>
          <h2 className="pc-heading-4" style={{ marginBottom: '2rem' }}>
            Form Components Demo
          </h2>
          <p className="pc-copy-2" style={{ marginBottom: '2rem', color: '#6b6c70' }}>
            Comprehensive form components styled with the Pampered Chef design system.
            All components support validation states, floating labels, and accessibility features.
          </p>

          {/* Buttons Section */}
          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Buttons</h3>
            <p className="pc-copy-2" style={{ marginBottom: '1rem', color: '#6b6c70' }}>
              Three button variants with hover, active, and disabled states.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => alert('Primary clicked!')}>
                Primary Button
              </Button>
              <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
                Secondary Button
              </Button>
              <Button variant="ghost" onClick={() => alert('Ghost clicked!')}>
                Ghost Button
              </Button>
              <Button variant="primary" disabled>
                Disabled Primary
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </div>
          </section>

          {/* Cards Section */}
          <section style={{ marginTop: '3rem' }}>
            <h3 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Cards</h3>
            <p className="pc-copy-2" style={{ marginBottom: '1rem', color: '#6b6c70' }}>
              Card containers with different variants and modifiers.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <Card>
                <h4 className="pc-heading-5" style={{ marginBottom: '0.5rem' }}>Default Card</h4>
                <p className="pc-copy-2">This is a default card variant with standard padding and borders.</p>
              </Card>
              <Card variant="light">
                <h4 className="pc-heading-5" style={{ marginBottom: '0.5rem' }}>Light Card</h4>
                <p className="pc-copy-2">Light background variant for subtle contrast.</p>
              </Card>
              <Card variant="dark">
                <h4 className="pc-heading-5" style={{ marginBottom: '0.5rem' }}>Dark Card</h4>
                <p className="pc-copy-2">Dark background variant for emphasis.</p>
              </Card>
            </div>
          </section>

          {/* Input Fields Section */}
          <section style={{ marginTop: '3rem' }}>
            <h3 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Input Fields</h3>
            <p className="pc-copy-2" style={{ marginBottom: '1rem', color: '#6b6c70' }}>
              Text inputs with floating labels that animate on focus and when filled.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <Input
                id="name"
                label="Full Name"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder=" "
              />
              <Input
                id="email"
                label="Email Address"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder=" "
                helperText="We'll never share your email."
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder=" "
                validationState="success"
                helperText="Password meets requirements"
              />
              <Input
                id="disabled-input"
                label="Disabled Input"
                type="text"
                value="Cannot edit this"
                disabled
                placeholder=" "
              />
              <Input
                id="error-input"
                label="Input with Error"
                type="text"
                placeholder=" "
                validationState="error"
                helperText="This field is required"
              />
              <Input
                id="warning-input"
                label="Input with Warning"
                type="text"
                placeholder=" "
                validationState="warning"
                helperText="Please verify this information"
              />
            </div>
          </section>

          {/* Checkboxes Section */}
          <section style={{ marginTop: '3rem' }}>
            <h3 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Checkboxes</h3>
            <p className="pc-copy-2" style={{ marginBottom: '1rem', color: '#6b6c70' }}>
              Custom-styled checkboxes with validation states.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Checkbox
                id="checkbox1"
                label="I agree to the terms and conditions"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <Checkbox
                id="checkbox2"
                label="Subscribe to newsletter (checked by default)"
                checked={checkbox2Checked}
                onChange={(e) => setCheckbox2Checked(e.target.checked)}
              />
              <Checkbox
                id="checkbox3"
                label="Disabled checkbox (unchecked)"
                disabled
              />
              <Checkbox
                id="checkbox4"
                label="Disabled checkbox (checked)"
                checked
                disabled
              />
              <Checkbox
                id="checkbox-success"
                label="Checkbox with success state"
                validationState="success"
                checked
              />
              <Checkbox
                id="checkbox-error"
                label="Checkbox with error state"
                validationState="error"
              />
            </div>

            <h4 className="pc-heading-5" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Inline Checkboxes</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Checkbox id="inline1" label="Option 1" inline />
              <Checkbox id="inline2" label="Option 2" inline />
              <Checkbox id="inline3" label="Option 3" inline />
            </div>
          </section>

          {/* Radio Buttons Section */}
          <section style={{ marginTop: '3rem' }}>
            <h3 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Radio Buttons</h3>
            <p className="pc-copy-2" style={{ marginBottom: '1rem', color: '#6b6c70' }}>
              Radio button groups with controlled state management.
            </p>

            <h4 className="pc-heading-5" style={{ marginBottom: '0.5rem' }}>Radio Group (Controlled)</h4>
            <RadioGroup name="preferences" value={radioValue} onChange={setRadioValue}>
              <Radio id="radio1" label="Option 1 - Selected by default" value="option1" />
              <Radio id="radio2" label="Option 2" value="option2" />
              <Radio id="radio3" label="Option 3" value="option3" />
            </RadioGroup>
            <p className="pc-copy-1" style={{ marginTop: '0.5rem', color: '#6b6c70' }}>
              Selected value: <strong>{radioValue}</strong>
            </p>

            <h4 className="pc-heading-5" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Radio with Validation States</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Radio id="radio-success" name="validation" label="Success state" value="success" validationState="success" checked />
              <Radio id="radio-warning" name="validation2" label="Warning state" value="warning" validationState="warning" />
              <Radio id="radio-error" name="validation3" label="Error state" value="error" validationState="error" />
              <Radio id="radio-disabled" name="validation4" label="Disabled state" value="disabled" disabled />
            </div>

            <h4 className="pc-heading-5" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Inline Radio Buttons</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Radio id="inline-radio1" name="inline-group" label="Small" value="small" inline />
              <Radio id="inline-radio2" name="inline-group" label="Medium" value="medium" inline />
              <Radio id="inline-radio3" name="inline-group" label="Large" value="large" inline />
            </div>
          </section>

          {/* Select Dropdowns Section */}
          <section style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <h3 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Select Dropdowns</h3>
            <p className="pc-copy-2" style={{ marginBottom: '1rem', color: '#6b6c70' }}>
              Select components with floating labels and validation states.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <Select
                id="country"
                label="Country"
                placeholder="Select a country"
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'mx', label: 'Mexico' },
                  { value: 'uk', label: 'United Kingdom' },
                ]}
                value={selectValue}
                onChange={setSelectValue}
              />
              <Select
                id="size"
                label="Size"
                options={[
                  { value: 'xs', label: 'Extra Small' },
                  { value: 's', label: 'Small' },
                  { value: 'm', label: 'Medium' },
                  { value: 'l', label: 'Large' },
                  { value: 'xl', label: 'Extra Large' },
                ]}
                value="m"
                helperText="Select your preferred size"
              />
              <Select
                id="select-success"
                label="Select with Success"
                options={[
                  { value: '1', label: 'Option 1' },
                  { value: '2', label: 'Option 2' },
                ]}
                validationState="success"
                value="1"
                helperText="Selection confirmed"
              />
              <Select
                id="select-error"
                label="Select with Error"
                placeholder="Please select an option"
                options={[
                  { value: '1', label: 'Option 1' },
                  { value: '2', label: 'Option 2' },
                ]}
                validationState="error"
                helperText="This field is required"
              />
              <Select
                id="select-disabled"
                label="Disabled Select"
                options={[
                  { value: '1', label: 'Option 1' },
                  { value: '2', label: 'Option 2' },
                ]}
                disabled
                value="1"
              />
            </div>
          </section>
        </div>
      )}

      {currentView === 'badge' && (
        <div>
          <h2 className="pc-heading-4" style={{ marginBottom: '2rem' }}>
            CC Badge Component Demo
          </h2>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Color Variants</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              The badge component supports three color variants: yellow (warning/onboarding), red (accent/new), and primary (brand).
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
              <CCBadge label="New" variant="yellow" />
              <CCBadge label="New" variant="red" />
              <CCBadge label="New" variant="primary" />
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Custom Labels</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Badges can display any custom label text.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              <CCBadge label="Beta" variant="yellow" />
              <CCBadge label="Hot" variant="red" />
              <CCBadge label="Pro" variant="primary" />
              <CCBadge label="Sale" variant="red" />
              <CCBadge label="Coming Soon" variant="yellow" />
              <CCBadge label="Limited" variant="primary" />
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Yellow Variant - Warning/Onboarding</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Yellow badges (#f2c75c) with dark text - used for warnings or onboarding states.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
              <CCBadge label="New" variant="yellow" />
              <CCBadge label="Beta" variant="yellow" />
              <CCBadge label="Preview" variant="yellow" />
              <CCBadge label="Warning" variant="yellow" />
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Red Variant - Accent/New</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Red badges (#c6404f) with white text - used for accent or "new" indicators.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
              <CCBadge label="New" variant="red" />
              <CCBadge label="Hot" variant="red" />
              <CCBadge label="Sale" variant="red" />
              <CCBadge label="Alert" variant="red" />
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Primary Variant - Brand</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Primary badges (#2d7e8b) with white text - brand color for emphasis.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
              <CCBadge label="New" variant="primary" />
              <CCBadge label="Pro" variant="primary" />
              <CCBadge label="Premium" variant="primary" />
              <CCBadge label="Featured" variant="primary" />
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Usage in Context</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Badges are designed to be used within other components like navigation buttons and tabs. They automatically inherit transitions from parent components.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '120px' }}>Menu Item</span>
                <CCBadge label="New" variant="yellow" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '120px' }}>Notifications</span>
                <CCBadge label="5" variant="red" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '120px' }}>Messages</span>
                <CCBadge label="12" variant="primary" />
              </div>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Technical Details</h3>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f3f6f6',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'monospace'
            }}>
              <p><strong>Component:</strong> CCBadge</p>
              <p style={{ marginTop: '0.5rem' }}><strong>Props:</strong></p>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>label: string (required) - Badge text</li>
                <li>variant: 'yellow' | 'red' | 'primary' (required) - Color variant</li>
                <li>className?: string (optional) - Additional CSS classes</li>
              </ul>
              <p style={{ marginTop: '0.5rem' }}><strong>Features:</strong></p>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Non-interactive (no hover/focus states)</li>
                <li>Renders as inline span element</li>
                <li>200ms transitions for color changes</li>
                <li>Full pill shape (border-radius: 9999px)</li>
                <li>Parent components can override styles via className</li>
              </ul>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Comparison Grid</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginTop: '1rem'
            }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                border: '2px solid #d3dede',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Yellow</h4>
                <CCBadge label="New" variant="yellow" />
                <p style={{ fontSize: '12px', color: '#6b6c70', marginTop: '1rem' }}>
                  #f2c75c background<br/>Dark text (#2f3031)
                </p>
              </div>
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                border: '2px solid #d3dede',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Red</h4>
                <CCBadge label="New" variant="red" />
                <p style={{ fontSize: '12px', color: '#6b6c70', marginTop: '1rem' }}>
                  #c6404f background<br/>White text (#ffffff)
                </p>
              </div>
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                border: '2px solid #d3dede',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Primary</h4>
                <CCBadge label="New" variant="primary" />
                <p style={{ fontSize: '12px', color: '#6b6c70', marginTop: '1rem' }}>
                  #2d7e8b background<br/>White text (#ffffff)
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {currentView === 'primary-button' && (
        <div>
          <h2 className="pc-heading-4" style={{ marginBottom: '2rem' }}>
            CC Navigation Primary Button Demo
          </h2>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Default Variant</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <CCNavigationPrimaryButton>MY BUSINESS</CCNavigationPrimaryButton>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">With Badge</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <CCNavigationPrimaryButton variant="badge">MY BUSINESS</CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton variant="badge" badgeLabel="New">
                MY BUSINESS
              </CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton variant="badge" badgeLabel="Beta">
                MY BUSINESS
              </CCNavigationPrimaryButton>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">With Dot</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <CCNavigationPrimaryButton variant="dot">MY BUSINESS</CCNavigationPrimaryButton>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Mobile Size</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <CCNavigationPrimaryButton mobile>MY BUSINESS</CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton mobile variant="badge">
                MY BUSINESS
              </CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton mobile variant="dot">
                MY BUSINESS
              </CCNavigationPrimaryButton>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Disabled State</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <CCNavigationPrimaryButton disabled>MY BUSINESS</CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton disabled variant="badge">
                MY BUSINESS
              </CCNavigationPrimaryButton>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Interactive States (Hover, Focus, Active)</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Try hovering, clicking, and using keyboard navigation (Tab) to see different states. Click buttons to toggle active state.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <CCNavigationPrimaryButton
                isActive={activePrimaryButton === 'btn1'}
                onClick={() => setActivePrimaryButton(activePrimaryButton === 'btn1' ? '' : 'btn1')}
              >
                HOVER ME
              </CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton
                variant="badge"
                isActive={activePrimaryButton === 'btn2'}
                onClick={() => setActivePrimaryButton(activePrimaryButton === 'btn2' ? '' : 'btn2')}
              >
                FOCUS ME
              </CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton
                variant="dot"
                isActive={activePrimaryButton === 'btn3'}
                onClick={() => setActivePrimaryButton(activePrimaryButton === 'btn3' ? '' : 'btn3')}
              >
                CLICK ME
              </CCNavigationPrimaryButton>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Active State Demo</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Click these buttons to see the persistent active state. Active buttons stay highlighted.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <CCNavigationPrimaryButton
                isActive={activePrimaryButton === 'business'}
                onClick={() => setActivePrimaryButton('business')}
              >
                MY BUSINESS
              </CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton
                isActive={activePrimaryButton === 'team'}
                onClick={() => setActivePrimaryButton('team')}
                variant="badge"
              >
                MY TEAM
              </CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton
                isActive={activePrimaryButton === 'resources'}
                onClick={() => setActivePrimaryButton('resources')}
              >
                MARKETING RESOURCES
              </CCNavigationPrimaryButton>
              <CCNavigationPrimaryButton
                isActive={activePrimaryButton === 'links'}
                onClick={() => setActivePrimaryButton('links')}
                variant="dot"
              >
                LINKS
              </CCNavigationPrimaryButton>
            </div>
          </section>
        </div>
      )}

      {currentView === 'secondary-tabs' && (
        <div>
          <h2 className="pc-heading-4" style={{ marginBottom: '2rem' }}>
            CC Navigation Secondary Tabs Demo
          </h2>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Interactive Tab Navigation</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Click tabs to switch between them. Try keyboard navigation (Tab key) and hover states.
            </p>
            <div
              role="tablist"
              aria-label="Demo navigation"
              style={{
                display: 'flex',
                gap: '0',
                borderBottom: '1px solid #d3dede',
                marginTop: '1rem',
              }}
            >
              <CCNavigationSecondaryTabs
                id="tab1"
                isActive={activeTab === 'tab1'}
                onClick={() => setActiveTab('tab1')}
                ariaControls="panel1"
              >
                Parties & Orders
              </CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs
                id="tab2"
                isActive={activeTab === 'tab2'}
                onClick={() => setActiveTab('tab2')}
                ariaControls="panel2"
                showBadge
              >
                Customers
              </CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs
                id="tab3"
                isActive={activeTab === 'tab3'}
                onClick={() => setActiveTab('tab3')}
                ariaControls="panel3"
              >
                My Profile
              </CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs
                id="tab4"
                isActive={activeTab === 'tab4'}
                onClick={() => setActiveTab('tab4')}
                ariaControls="panel4"
              >
                Settings
              </CCNavigationSecondaryTabs>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#f3f6f6', marginTop: '0' }}>
              {activeTab === 'tab1' && (
                <div role="tabpanel" id="panel1" aria-labelledby="tab1">
                  <h4 className="pc-heading-5">Parties & Orders</h4>
                  <p className="pc-copy-2">View and manage your party bookings and orders.</p>
                </div>
              )}
              {activeTab === 'tab2' && (
                <div role="tabpanel" id="panel2" aria-labelledby="tab2">
                  <h4 className="pc-heading-5">Customers</h4>
                  <p className="pc-copy-2">Manage your customer relationships and contacts.</p>
                </div>
              )}
              {activeTab === 'tab3' && (
                <div role="tabpanel" id="panel3" aria-labelledby="tab3">
                  <h4 className="pc-heading-5">My Profile</h4>
                  <p className="pc-copy-2">Update your personal information and preferences.</p>
                </div>
              )}
              {activeTab === 'tab4' && (
                <div role="tabpanel" id="panel4" aria-labelledby="tab4">
                  <h4 className="pc-heading-5">Settings</h4>
                  <p className="pc-copy-2">Configure your account settings and notifications.</p>
                </div>
              )}
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">With Custom Badge Labels</h3>
            <div
              role="tablist"
              aria-label="Badge demo navigation"
              style={{
                display: 'flex',
                gap: '0',
                borderBottom: '1px solid #d3dede',
                marginTop: '1rem',
              }}
            >
              <CCNavigationSecondaryTabs isActive showBadge badgeLabel="New">
                Products
              </CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs showBadge badgeLabel="Beta">
                Features
              </CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs showBadge badgeLabel="Hot">
                Deals
              </CCNavigationSecondaryTabs>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Mobile Variant</h3>
            <div
              role="tablist"
              aria-label="Mobile demo navigation"
              style={{
                display: 'flex',
                gap: '0',
                borderBottom: '1px solid #d3dede',
                marginTop: '1rem',
              }}
            >
              <CCNavigationSecondaryTabs mobile isActive>
                Tab 1
              </CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs mobile>Tab 2</CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs mobile showBadge>
                Tab 3
              </CCNavigationSecondaryTabs>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">Disabled State</h3>
            <div
              role="tablist"
              aria-label="Disabled demo navigation"
              style={{
                display: 'flex',
                gap: '0',
                borderBottom: '1px solid #d3dede',
                marginTop: '1rem',
              }}
            >
              <CCNavigationSecondaryTabs isActive>Active</CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs>Enabled</CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs disabled>Disabled</CCNavigationSecondaryTabs>
              <CCNavigationSecondaryTabs disabled showBadge>
                Disabled with Badge
              </CCNavigationSecondaryTabs>
            </div>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h3 className="pc-heading-5">All States Preview</h3>
            <p style={{ fontSize: '14px', color: '#6b6c70', marginBottom: '1rem' }}>
              Hover over tabs to see hover state. Use Tab key for focus state. Click for active state.
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#f3f6f6',
                borderRadius: '4px',
              }}
            >
              <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #d3dede' }}>
                <CCNavigationSecondaryTabs>Default (Hover Me)</CCNavigationSecondaryTabs>
              </div>
              <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #d3dede' }}>
                <CCNavigationSecondaryTabs isActive>Active State</CCNavigationSecondaryTabs>
              </div>
              <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #d3dede' }}>
                <CCNavigationSecondaryTabs showBadge>With Badge</CCNavigationSecondaryTabs>
              </div>
              <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #d3dede' }}>
                <CCNavigationSecondaryTabs isActive showBadge>
                  Active with Badge
                </CCNavigationSecondaryTabs>
              </div>
            </div>
          </section>
        </div>
      )}

      {currentView === 'navigation-main' && (
        <div style={{ margin: '-2rem', marginTop: '-2rem' }}>
          <CCNavigationMain />
          <div style={{ padding: '2rem' }}>
            <h2 className="pc-heading-4" style={{ marginBottom: '1rem' }}>
              CC Navigation Main Demo
            </h2>
            <p className="pc-copy-2" style={{ marginBottom: '1rem' }}>
              The navigation bar above demonstrates the CCNavigationMain component, which integrates:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li className="pc-copy-2">CCNavigationPrimaryButton for main navigation tabs</li>
              <li className="pc-copy-2">CCNavigationSecondaryTabs for secondary navigation</li>
              <li className="pc-copy-2">CCNavigationUsefulLinksMenu for the LINKS dropdown</li>
              <li className="pc-copy-2">Responsive layout (mobile/desktop)</li>
            </ul>

            <section style={{ marginTop: '2rem' }}>
              <h3 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Features</h3>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f3f6f6',
                borderRadius: '4px',
                fontSize: '14px',
              }}>
                <ul style={{ marginLeft: '1.5rem' }}>
                  <li>Click primary tabs (MY BUSINESS, MY TEAM, MARKETING RESOURCES) to switch views</li>
                  <li>Secondary tabs change based on the selected primary tab</li>
                  <li>Click "LINKS" to open the Useful Links menu</li>
                  <li>Resize the browser to see responsive behavior (mobile &lt; 1024px)</li>
                  <li>At 1200px+, primary nav moves inline with the logo</li>
                </ul>
              </div>
            </section>

            <section style={{ marginTop: '2rem' }}>
              <h3 className="pc-heading-5" style={{ marginBottom: '1rem' }}>Technical Details</h3>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f3f6f6',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}>
                <p><strong>Component:</strong> CCNavigationMain</p>
                <p style={{ marginTop: '0.5rem' }}><strong>Props:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>activePrimary?: PrimaryTab - Default active primary tab</li>
                  <li>activeSecondary?: SecondaryTab - Default active secondary tab</li>
                  <li>onPrimaryChange?: (tab) =&gt; void - Primary tab change callback</li>
                  <li>onSecondaryChange?: (tab) =&gt; void - Secondary tab change callback</li>
                  <li>className?: string - Additional CSS classes</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
