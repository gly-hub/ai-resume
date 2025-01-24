import { Box, VStack, HStack, Heading, Spacer, Button, Tabs, TabList, TabPanel, TabPanels, Tab } from '@chakra-ui/react'
import { FaFileImport } from 'react-icons/fa'
import { BasicInfoForm } from '../components/BasicInfoForm'
import { EducationForm } from '../components/EducationForm'
import { ExperienceForm } from '../components/ExperienceForm'
import { ProjectForm } from '../components/ProjectForm'
import { SkillsForm } from '../components/SkillsForm'
import { AdditionalForm } from '../components/AdditionalForm'
import { LayoutSettings } from '../components/LayoutSettings'
import { TemplateSelector } from '../components/TemplateSelector'

export function Editor() {
  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <HStack>
          <Heading size="lg">简历编辑器</Heading>
          <Spacer />
          <Button leftIcon={<FaFileImport />} colorScheme="blue">
            导入简历
          </Button>
        </HStack>

        <Tabs>
          <TabList>
            <Tab>基本信息</Tab>
            <Tab>教育背景</Tab>
            <Tab>工作经验</Tab>
            <Tab>项目经验</Tab>
            <Tab>技能清单</Tab>
            <Tab>其他信息</Tab>
            <Tab>版面设置</Tab>
            <Tab>模板选择</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <BasicInfoForm />
            </TabPanel>
            <TabPanel>
              <EducationForm />
            </TabPanel>
            <TabPanel>
              <ExperienceForm />
            </TabPanel>
            <TabPanel>
              <ProjectForm />
            </TabPanel>
            <TabPanel>
              <SkillsForm />
            </TabPanel>
            <TabPanel>
              <AdditionalForm />
            </TabPanel>
            <TabPanel>
              <LayoutSettings />
            </TabPanel>
            <TabPanel>
              <TemplateSelector />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  )
} 