import { useState } from 'react';
import {
  Page,
  Layout,
  Text,
  TextField,
  Select,
  Button,
  Card,
  InlineGrid,
  Divider,
  Checkbox,
  ColorPicker,
  hsbToHex,
} from '@shopify/polaris';

export default function CreateSizeChartFromScratch({ onBack }) {
  const [chartTitle, setChartTitle] = useState('');
  const [unit, setUnit] = useState('centimeter');
  const [conversion, setConversion] = useState('inches');
  const [showBorders, setShowBorders] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState({ hue: 210, saturation: 0.008, brightness: 0.984 });

  // Empty state for rows to be filled by the user
  const [formValues, setFormValues] = useState({
    title: '',
    unit: 'centimeter',
    rows: [
      { label: '', S: '', M: '', L: '', XL: '', XXL: '' },
    ],
  });

  const handleRowChange = (index, key, value) => {
    const updatedRows = [...formValues.rows];
    updatedRows[index][key] = value;
    setFormValues({ ...formValues, rows: updatedRows });
  };

  const addRow = () => {
    setFormValues({
      ...formValues,
      rows: [...formValues.rows, { label: '', S: '', M: '', L: '', XL: '', XXL: '' }],
    });
  };

  return (
    <Page fullWidth title="Create New Size Chart from Scratch" backAction={{ content: 'Back', onAction: onBack }}>
      <Layout>
        <Layout.Section oneHalf>
          <Card padding="400">
            <InlineGrid columns={1} gap="400">
              <Text variant="headingMd" as="h2">Chart Title</Text>
              <TextField
                label="Chart Title"
                value={formValues.title}
                onChange={(value) => setFormValues({ ...formValues, title: value })}
              />

              <Select
                label="Chart Table Units"
                options={[
                  { label: 'Centimeter', value: 'centimeter' },
                  { label: 'Inches', value: 'inches' },
                ]}
                onChange={(value) => {
                  setUnit(value);
                  setFormValues({ ...formValues, unit: value });
                }}
                value={unit}
              />

              <Select
                label="Chart Table Conversion Units"
                options={[
                  { label: 'Centimeter → Inches', value: 'inches' },
                  { label: 'Inches → Centimeter', value: 'centimeter' },
                ]}
                onChange={setConversion}
                value={conversion}
              />

              <Button onClick={addRow} variant="tertiary">Add Row</Button>

              <Divider />

              <Button tone="success" variant="primary">
                Save Chart
              </Button>
            </InlineGrid>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card padding="400">
            <Text variant="headingSm" as="h3" fontWeight="medium">Preview</Text>
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              {formValues.rows.length > 0 && (
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: showBorders ? '1px solid #ccc' : 'none',
                  }}
                >
                  <thead style={{ backgroundColor: hsbToHex(headerBgColor) }}>
                    <tr>
                      <th style={{ padding: '8px' }}>Label</th>
                      <th style={{ padding: '8px' }}>S</th>
                      <th style={{ padding: '8px' }}>M</th>
                      <th style={{ padding: '8px' }}>L</th>
                      <th style={{ padding: '8px' }}>XL</th>
                      <th style={{ padding: '8px' }}>XXL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formValues.rows.map((row, idx) => (
                      <tr key={idx}>
                        {['label', 'S', 'M', 'L', 'XL', 'XXL'].map((key) => (
                          <td key={key} style={{ padding: '8px' }}>
                            <TextField
                              labelHidden
                              label={key}
                              value={row[key]}
                              onChange={(value) => handleRowChange(idx, key, value)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <Divider borderColor="border" />

            <Checkbox
              label="Show Borders"
              checked={showBorders}
              onChange={setShowBorders}
            />

            <div style={{ marginTop: '1rem' }}>
              <Text variant="bodyMd">Header Background Color</Text>
              <ColorPicker
                onChange={setHeaderBgColor}
                color={headerBgColor}
                allowAlpha
              />
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
