import { useState } from 'react';
import {
  Page,
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
  Box,
  InlineStack
} from '@shopify/polaris';
import { PlusCircleIcon } from "@shopify/polaris-icons";

export default function CreateSizeChart({ onBack }) {
  const [chartTitle, setChartTitle] = useState('');
  const [unit, setUnit] = useState('centimeter');
  const [conversion, setConversion] = useState('inches');
  const [showBorders, setShowBorders] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState({ hue: 160, saturation: 0.3, brightness: 0.94 });

  const headers = ['Size', 'S', 'M', 'L', 'XL', 'XXL'];
  const rows = ['Chest', 'Across Shoulder', 'Sleeve Length', 'Shirt Length'];

  return (
    <Page fullWidth title="Create New Size Chart" backAction={{ content: 'Back', onAction: onBack }}>
      <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
        {/* Chart Builder */}
        <Card padding="400">
          <InlineGrid columns={1} gap="400">
            <Text variant="headingMd" as="h2">Chart Title</Text>
            <TextField
              value={chartTitle}
              onChange={setChartTitle}
              placeholder="Enter chart title"
            />

            {/* Dropdowns in one row */}
            <InlineGrid columns={2} gap="200">
              {/* Chart Table Units */}
              <div style={{ position: 'relative', width: '100%' }}>
                <Select
                  label="Chart Table Units"
                  options={[
                    { label: 'Centimeter', value: 'centimeter' },
                    { label: 'Inches', value: 'inches' },
                  ]}
                  onChange={setUnit}
                  value={unit}
                />
                <img
                  src="/chevron-down.png"
                  alt="Arrow"
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    width: '16px',
                    height: '16px',
                    pointerEvents: 'none',
                    transform: 'translateY(-50%)',
                  }}
                />
              </div>

              {/* Conversion Units */}
              <div style={{ position: 'relative', width: '100%' }}>
                <Select
                  label="Conversion Units"
                  options={[
                    { label: 'Centimeter → Inches', value: 'inches' },
                    { label: 'Inches → Centimeter', value: 'centimeter' },
                  ]}
                  onChange={setConversion}
                  value={conversion}
                />
                <img
                  src="/chevron-down.png"
                  alt="Arrow"
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    width: '16px',
                    height: '16px',
                    pointerEvents: 'none',
                    transform: 'translateY(-50%)',
                  }}
                />
              </div>
            </InlineGrid>

            {/* Size Chart Table */}
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: showBorders ? '1px solid #ccc' : 'none',
                }}
              >
                <thead style={{ backgroundColor: hsbToHex(headerBgColor) }}>
                  <tr>
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        style={{
                          padding: '8px',
                          border: showBorders ? '1px solid #ccc' : 'none',
                          textAlign: 'left',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '8px', border: showBorders ? '1px solid #ccc' : 'none' }}>{row}</td>
                      {headers.slice(1).map((_, i) => (
                        <td
                          key={i}
                          style={{
                            padding: '8px',
                            border: showBorders ? '1px solid #ccc' : 'none',
                          }}
                        >
                          -
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Divider />

            {/* ✅ Updated button group using InlineStack */}
           <InlineStack align="space-between" gap="400">
  <InlineStack gap="200">

<Button tone="success">
  <span
    style={{
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      color: "rgba(55, 55, 55, 0.5)",
    }}
  >
    <PlusCircleIcon style={{ width: 24, height: 24, marginRight: 8 }} />
    Add ROW
  </span>
</Button>


    <Button tone="success">
  <span
    style={{
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      color: "rgba(55, 55, 55, 0.5)",
    }}
  >
    <PlusCircleIcon style={{ width: 24, height: 24, marginRight: 8 }} />
    Add Column
  </span>
</Button>

  </InlineStack>

  <Button
    variant="primary"
    tone="success"
    icon={() => (
      <img
        src="/save.png"
        alt="Save"
        style={{ width: 20, height: 20 }}
      />
    )}
    style={{
      color: 'white',
      padding: '14px 31px',
    }}
  >
    <span style={{ display: "inline-block", padding: " 8px 12px" }}>
                    save Chart
                  </span>
  </Button>
</InlineStack>

          </InlineGrid>
        </Card>

        {/* Preview */}
        <Card padding="400">
          <Text variant="headingSm" as="h3" fontWeight="medium">Preview</Text>

          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: showBorders ? '1px solid #ccc' : 'none',
              }}
            >
              <thead style={{ backgroundColor: hsbToHex(headerBgColor) }}>
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      style={{
                        padding: '8px',
                        border: showBorders ? '1px solid #ccc' : 'none',
                        textAlign: 'left',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        padding: '8px',
                        border: showBorders ? '1px solid #ccc' : 'none',
                        color: '#888',
                      }}
                    >
                      {row}
                    </td>
                    {headers.slice(1).map((_, i) => (
                      <td
                        key={i}
                        style={{
                          padding: '8px',
                          border: showBorders ? '1px solid #ccc' : 'none',
                        }}
                      >
                        -
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Divider borderColor="border" />

          <Checkbox
            label="Show Borders"
            checked={showBorders}
            onChange={setShowBorders}
          />

          <Box paddingBlockStart="300">
            <Text variant="bodyMd">Header Background Color</Text>
            <InlineGrid columns={['auto', 'auto']} gap="200" align="center">
              <Box
                width="40px"
                height="40px"
                borderRadius="base"
                borderWidth="1"
                borderColor="border"
                background="bg-surface"
                style={{ backgroundColor: hsbToHex(headerBgColor) }}
              />
              <Text variant="bodySm" tone="subdued">{hsbToHex(headerBgColor)}</Text>
            </InlineGrid>
            <ColorPicker
              onChange={setHeaderBgColor}
              color={headerBgColor}
              allowAlpha
            />
          </Box>
        </Card>
      </InlineGrid>
    </Page>
  );
}