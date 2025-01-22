import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Heading,
  Divider,
  Button,
  HStack,
  Spacer,
  Icon,
  Box
} from '@chakra-ui/react'
import { useResumeStore } from '../store/resumeStore'
import { BasicInfoForm } from './BasicInfoForm'
import { EducationForm } from './EducationForm'
import { ExperienceForm } from './ExperienceForm'
import { ProjectForm } from './ProjectForm'
import { SkillsForm } from './SkillsForm'
import { AdditionalForm } from './AdditionalForm'
import { SectionSorter } from './SectionSorter'
import { TemplateSelector } from './TemplateSelector'
import { FaFileImport } from 'react-icons/fa'
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export function Editor() {
  const loadSample = useResumeStore((state) => state.loadSample)
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <VStack spacing={4} align="stretch" h="100%">
      <HStack>
        <Heading size="md">简历内容</Heading>
        <Spacer />
        <Button
          leftIcon={<Icon as={FaFileImport} />}
          colorScheme="blue"
          onClick={loadSample}
          size="md"
        >
          导入示例简历
        </Button>
      </HStack>
      <Divider />
      
      <Tabs flex={1} display="flex" flexDirection="row">
      <Box display="flex" position="relative">
        <TabList 
          flexDirection="column" 
          borderRight="1px" 
          borderRightColor="gray.200" 
          minW={isCollapsed ? "0" : "200px"}
          bg="gray.50"
          p={2}
          transition="all 0.2s"
          w={isCollapsed ? "0" : "auto"}
          overflow="hidden"
        >
          <Tab 
            justifyContent="flex-start" 
            pl={4} 
            mb={2}
            _selected={{ bg: 'white', borderRadius: 'md' }}
          >
            编辑内容
          </Tab>
          <Tab 
            justifyContent="flex-start" 
            pl={4}
            mb={2}
            _selected={{ bg: 'white', borderRadius: 'md' }}
          >
            排序设置
          </Tab>
          <Tab 
            justifyContent="flex-start" 
            pl={4}
            _selected={{ bg: 'white', borderRadius: 'md' }}
          >
            模板选择
          </Tab>
        </TabList>

        <IconButton
          aria-label="Toggle sidebar"
          icon={isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          position="absolute"
          right="-16px"
          top="2"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          zIndex={2}
        />
      </Box>

      <TabPanels flex={1} overflowY="auto" p={4}>
          <TabPanel p={0} pt={4}>
            <Tabs>
              <TabList>
                <Tab>基本信息</Tab>
                <Tab>教育背景</Tab>
                <Tab>工作经验</Tab>
                <Tab>项目经验</Tab>
                <Tab>技能清单</Tab>
                <Tab>其他信息</Tab>
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
              </TabPanels>
            </Tabs>
          </TabPanel>
          
          <TabPanel>
            <Box p={4}>
              <SectionSorter />
            </Box>
          </TabPanel>

          <TabPanel>
            <Box p={4}>
              <TemplateSelector />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
} 