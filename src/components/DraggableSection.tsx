import { Box, HStack, IconButton, Switch, Text } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ResumeSection } from '../types'

interface Props {
  section: ResumeSection
  onVisibilityChange: (id: string, visible: boolean) => void
}

export function DraggableSection({ section, onVisibilityChange }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      p={4}
      bg="white"
      borderWidth={1}
      borderRadius="md"
      boxShadow="sm"
      _hover={{ boxShadow: 'md' }}
    >
      <HStack spacing={4}>
        <IconButton
          {...attributes}
          {...listeners}
          aria-label="拖动排序"
          icon={<DragHandleIcon />}
          variant="ghost"
          cursor="grab"
          size="sm"
        />
        <Text flex={1} fontWeight="medium">
          {section.name}
        </Text>
        <Switch
          isChecked={section.visible}
          onChange={(e) => onVisibilityChange(section.id, e.target.checked)}
        />
      </HStack>
    </Box>
  )
}