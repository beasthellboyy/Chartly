// Imports
import {
  Page, Layout, Text, Card, Button, BlockStack, Box, InlineStack, Modal,
  Frame, Autocomplete, Icon
} from "@shopify/polaris";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useFetcher } from "@remix-run/react";
import { PlusCircleIcon, ChartFunnelIcon, SearchIcon, EditIcon, DeleteIcon, CalendarIcon } from "@shopify/polaris-icons";
import { useAppBridge } from "@shopify/app-bridge-react";
import styles from "./_index/styles.module.css";
import { templates, getTemplateById } from "./data/template";
import CreateSizeChart from "./components/app.sizechartwittemp";
import CreateSizeChartFromScratch from "./components/app.sizechartwitscrat";

// ChartCard Component
function ChartCard({ title, category, date, status }) {
  return (
    <Card roundedAbove="sm" padding="400" style={{ borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <BlockStack gap="300">
        <InlineStack align="space-between" blockAlign="center">
          <Text variant="headingSm" fontWeight="medium">{title}</Text>
          <InlineStack gap="100">
            <Button icon={EditIcon} size="slim" variant="tertiary" />
            <Button icon={DeleteIcon} size="slim" variant="tertiary" />
          </InlineStack>
        </InlineStack>

        <Box>
          <Box style={{ display: "inline-block", backgroundColor: "#E3F1EB", color: "#008060", padding: "4px 12px", borderRadius: "16px", fontSize: "13px", fontWeight: "500" }}>
            {category}
          </Box>
        </Box>

        <Box style={{ backgroundColor: "#F6F6F7", borderRadius: "8px", height: "158px", width: "100%" }} />

        <InlineStack align="space-between" blockAlign="center">
          <InlineStack gap="100" blockAlign="center">
            <Icon source={CalendarIcon} tone="subdued" />
            <Text size="bodySm" tone="subdued">{date}</Text>
          </InlineStack>
          <Box style={{ backgroundColor: "#008060", color: "#fff", fontSize: "13px", fontWeight: "500", padding: "4px 12px", borderRadius: "16px" }}>
            {status}
          </Box>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();

  const [modalActive, setModalActive] = useState(true);
  const [createModalActive, setCreateModalActive] = useState(false);
  const [isChoosingTemplate, setIsChoosingTemplate] = useState(false);
  const [creationChoice, setCreationChoice] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showChartBuilder, setShowChartBuilder] = useState(false);

  const toggleModal = useCallback(() => setModalActive(prev => !prev), []);
  const toggleCreateModal = useCallback(() => setCreateModalActive(prev => !prev), []);

  const handleCreateOption = (option) => {
    setCreationChoice(option);
    if (option === 'scratch') {
      setShowChartBuilder(true);
      setCreateModalActive(false);
    } else if (option === 'template') {
      setIsChoosingTemplate(true);
    }
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    const templateData = getTemplateById(templateId);
    setFormData(templateData);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      setShowChartBuilder(true);
      setCreateModalActive(false);
    }
  };

  useEffect(() => {
    const productId = fetcher.data?.product?.id?.replace("gid://shopify/Product/", "");
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data, shopify]);

  if (showChartBuilder) {
    return creationChoice === 'scratch' ? (
      <CreateSizeChartFromScratch onBack={() => setShowChartBuilder(false)} />
    ) : (
      <CreateSizeChart
        templateData={formData}
        onBack={() => {
          setShowChartBuilder(false);
          setIsChoosingTemplate(true);
          setCreateModalActive(true);
        }}
      />
    );
  }

  return (
    <Frame>
      <Page title="" fullWidth>
        <Layout>
          <Layout.Section>

            {/* Top Bar */}
            <InlineStack align="space-between" blockAlign="center" wrap={false} style={{ marginTop: "2rem", marginBottom: "1rem" }}>
              <Text variant="headingLg" as="h1">My Charts</Text>
              <InlineStack gap="200">
                <Button variant="secondary" icon={ChartFunnelIcon}>
                  <span  style={{
                      display: "inline-block",
                      padding: "0.5rem 0rem", // Top-Bottom: 1rem, Left-Right: 2rem
                    }}>
                    Filter
                  </span>
                </Button>
                <Button variant="primary" tone="success" icon={PlusCircleIcon} onClick={toggleCreateModal} className={styles.newChartButton}> 
                   <span style={{
                      display: "inline-block",
                      padding: "0.5rem 0rem", // Top-Bottom: 1rem, Left-Right: 2rem
                    }}>
                      Add New Chart
                    </span>
                  </Button>
              </InlineStack>
            </InlineStack>

            {/* Charts */}
            <Box paddingBlockStart="400">
              <InlineStack gap="400" wrap>
                {[1, 2, 3].map((_, index) => (
                  <Box key={index} style={{ minWidth: "320px", maxWidth: "360px", width: "100%" }}>
                    <ChartCard title="Women’s T-shirt Sizes" category="Apparel" date="April 11, 2025" status="Published" />
                  </Box>
                ))}
              </InlineStack>
            </Box>

            {/* Onboarding Modal */}
            <Modal open={modalActive} size="medium" onClose={toggleModal} titleHidden sectioned>
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <Text variant="headingXl" as="h2">Welcome to <span style={{ fontWeight: 600, color: 'var(--p-color-text-success-secondary)' }}>Chartly!</span></Text>
                <BlockStack gap="1200">
                  <Box paddingBlock="200">
                    <Text tone="subdued" variant="bodyLg">Your go-to tool for creating professional<br />size charts on Shopify.</Text>
                  </Box>
                  <Button variant="primary" tone="success" onClick={toggleModal} style={{ width: "206px", height: "56px", borderRadius: "8px", backgroundColor: "#008059", color: "white", fontWeight: "600", fontSize: "16px", border:"none", cursor:"pointer" }}>
                    Let’s Begin
                  </Button>
                </BlockStack>
              </div>
            </Modal>

            {/* Create Chart Modal */}
            <Modal
              open={createModalActive}
              onClose={() => {
                toggleCreateModal();
                setIsChoosingTemplate(false);
                setSelectedTemplate(null);
              }}
              sectioned
            >
              {isChoosingTemplate ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <Text variant="headingLg" as="h2" fontWeight="bold">Choose a Template</Text>
                  <Box paddingBlock="200">
                    <Text tone="subdued" variant="bodyMd">Please choose a template to get started</Text>
                  </Box>
                  <InlineStack gap="400" wrap align="center" blockAlign="center" style={{ justifyContent: "center" }}>
                    {templates.map((template) => (
                      <img
                        key={template.id}
                        src="template1.png"
                        title={template.name}
                        alt={template.name}
                        onClick={() => handleTemplateSelect(template.id)}
                        style={{
                          width: 120, height: 120, borderRadius: 32, cursor: "pointer",
                          border: selectedTemplate === template.id ? "1px solid #008059" : "2px solid #E2E8F0",
                          transition: "all 0.2s ease-in-out"
                        }}
                      />
                    ))}
                  </InlineStack>
                  <Box paddingBlockStart="400">
                    <InlineStack gap="300" align="center" blockAlign="center">
                      <Button onClick={() => setIsChoosingTemplate(false)}>Go Back</Button>
                      <Button tone="success" variant="primary" onClick={handleUseTemplate}>Next</Button>
                    </InlineStack>
                  </Box>
                </div>
              ) : (
                  // Initial "scratch or template" step
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <Text variant="headingLg" as="h2" fontWeight="bold">
                      How do you want to create the size chart?
                    </Text>
                    <Box paddingBlock="400">
                    <InlineStack gap="800" wrap={false} blockAlign="center" align="center">
                      {/* Start From Scratch */}
                      <Box
                        onClick={() => handleCreateOption('scratch')}
                        style={{
                          width: "234px",
                          height: "234px",
                          border: "1px solid #E2E8F0",
                          borderRadius: "32px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                      <img
                        src="/frame-76-5.png"
                        alt="Start From Scratch Icon"
                        style={{ marginBottom: "12px" }}
                      />
                      <Text fontWeight="semibold">Start From Scratch</Text>
                    </Box>
                    {/* Choose a Template */}
                    <Box
                      onClick={() => handleCreateOption('template')}
                      style={{
                        width: "234px",
                        height: "234px",
                        border: "1px solid #E2E8F0",
                        borderRadius: "32px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                    <img
                      src="/frame-76-6.png"
                      alt="Choose a Template Icon"
                      style={{ marginBottom: "12px" }}
                    />
                    <Text fontWeight="semibold">Choose a Template</Text>
                    </Box>
                  </InlineStack>
                </Box>
              </div>
                )}
            </Modal>

          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
