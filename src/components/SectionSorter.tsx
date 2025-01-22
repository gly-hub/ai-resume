import { VStack } from '@chakra-ui/react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useResumeStore } from '../store/resumeStore'
import { DraggableSection } from './DraggableSection'

export function SectionSorter() {
  const sections = useResumeStore((state) => state.resume.sections)
  const updateSection = useResumeStore((state) => state.updateSection)
  const updateSectionOrder = useResumeStore((state) => state.updateSectionOrder)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = sections.findIndex((section) => section.id === active.id)
    const newIndex = sections.findIndex((section) => section.id === over.id)

    const newSections = arrayMove([...sections], oldIndex, newIndex).map(
      (section, index) => ({
        ...section,
        order: index + 1,
      })
    )

    updateSectionOrder(newSections)
  }

  const handleVisibilityChange = (id: string, visible: boolean) => {
    updateSection(id, visible)
  }

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortedSections.map(section => section.id)}
        strategy={verticalListSortingStrategy}
      >
        <VStack spacing={2} align="stretch">
          {sortedSections.map((section) => (
            <DraggableSection
              key={section.id}
              section={section}
              onVisibilityChange={handleVisibilityChange}
            />
          ))}
        </VStack>
      </SortableContext>
    </DndContext>
  )
} 