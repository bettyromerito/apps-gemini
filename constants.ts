import type { CameraAngle } from './types';

export interface TechniqueCategory {
    title: string;
    techniques: CameraAngle[];
}

export const TECHNIQUE_CATEGORIES: TechniqueCategory[] = [
  {
    title: 'Tipos de planos y encuadres',
    techniques: [
      { 
        id: 'wide-shot', 
        title: 'Plano general', 
        description: 'Muestra el sujeto en su entorno completo.', 
        prompt: 'Recreate the image as a wide shot, showing the main subject within their complete environment. Pull the camera back to reveal more of the surroundings.'
      },
      { 
        id: 'american-shot', 
        title: 'Plano americano', 
        description: 'Corta aproximadamente a la altura de las rodillas.', 
        prompt: 'Generate an American shot of the subject, framing them from their mid-thighs up. Ensure the focus remains on the character.'
      },
      { 
        id: 'medium-shot', 
        title: 'Plano medio', 
        description: 'Desde la cintura hacia arriba.', 
        prompt: 'Generate a medium shot of the main subject, framing them from the waist up. This should feel more intimate than a wide shot.'
      },
      { 
        id: 'close-up', 
        title: 'Primer plano', 
        description: 'Enfoca el rostro o detalles específicos.', 
        prompt: 'Generate a close-up of the main subject, tightly framing their face to capture emotion and detail.'
      },
      { 
        id: 'extreme-close-up', 
        title: 'Primerísimo primer plano', 
        description: 'Muestra solo una parte del rostro.', 
        prompt: 'Generate an extreme close-up, focusing on a single detail of the subject, such as their eyes or mouth, to create a dramatic effect.'
      },
      { 
        id: 'detail-shot', 
        title: 'Plano detalle', 
        description: 'Enfoca elementos muy específicos como ojos, manos.', 
        prompt: 'Generate a detail shot (or insert shot) focusing on a very specific object or part of the subject, like their hands, a piece of jewelry, or an object they are interacting with.'
      }
    ]
  },
  {
    title: 'Ángulos de cámara',
    techniques: [
      { 
        id: 'low-angle', 
        title: 'Contrapicado', 
        description: 'Cámara por debajo del sujeto, da sensación de poder.', 
        prompt: 'Recreate the image from a low angle, looking up at the subject to make them appear powerful, tall, or intimidating.'
      },
      { 
        id: 'high-angle', 
        title: 'Picado', 
        description: 'Cámara por encima del sujeto, lo minimiza.', 
        prompt: 'Recreate the image from a high angle, looking down on the subject to make them appear smaller, vulnerable, or insignificant.'
      },
      { 
        id: 'dutch-angle', 
        title: 'Ángulo holandés', 
        description: 'Cámara inclinada, crea tensión.', 
        prompt: 'Recreate the image with a Dutch angle (or Dutch tilt), tilting the camera axis to create a sense of unease, tension, or disorientation.'
      },
      { 
        id: 'birds-eye-view', 
        title: 'Ángulo cenital', 
        description: 'Directamente desde arriba.', 
        prompt: 'Generate a bird\'s-eye view of the scene, looking directly down from above as if from a great height.'
      },
      { 
        id: 'nadir-shot', 
        title: 'Ángulo nadir', 
        description: 'Directamente desde abajo.', 
        prompt: 'Generate a nadir shot of the scene, looking directly up from the ground. This should create an extreme low-angle effect.'
      },
      {
        id: 'right-side-view',
        title: 'Vista lateral derecha',
        description: 'Muestra el sujeto directamente desde su lado derecho.',
        prompt: 'Recreate the image from a right side profile view, showing the subject directly from their right side.'
      },
      {
        id: 'left-side-view',
        title: 'Vista lateral izquierda',
        description: 'Muestra el sujeto directamente desde su lado izquierdo.',
        prompt: 'Recreate the image from a left side profile view, showing the subject directly from their left side.'
      },
      {
        id: 'three-quarter-profile',
        title: 'Perfil 3/4',
        description: 'Un ángulo entre la vista frontal y la vista lateral.',
        prompt: 'Recreate the image from a three-quarter profile view, with the camera positioned between a frontal and a side view to capture depth and dimension of the subject.'
      }
    ]
  },
  {
    title: 'Composición y técnicas',
    techniques: [
      { 
        id: 'rule-of-thirds', 
        title: 'Regla de los tercios', 
        description: 'Divide la imagen en nueve partes iguales.', 
        prompt: 'Recompose the image to follow the rule of thirds, placing the main subject or key elements off-center, along the grid lines or at their intersections for a more balanced and dynamic composition.'
      },
      { 
        id: 'leading-lines', 
        title: 'Líneas guía', 
        description: 'Dirigen la mirada hacia el sujeto principal.', 
        prompt: 'Recompose the image to emphasize leading lines (like roads, fences, or rivers) that draw the viewer\'s eye towards the main subject.'
      },
      { 
        id: 'symmetry', 
        title: 'Simetría', 
        description: 'Equilibrio visual perfecto.', 
        prompt: 'Recompose the image to be perfectly symmetrical, creating a sense of balance, harmony, and visual stability. The subject should be centered.'
      },
      { 
        id: 'depth-of-field', 
        title: 'Profundidad de campo', 
        description: 'Controla qué partes están enfocadas.', 
        prompt: 'Recreate the image with a very shallow depth of field, keeping the subject sharp and clear while the background is significantly blurred.'
      },
      { 
        id: 'bokeh', 
        title: 'Bokeh', 
        description: 'Desenfoque artístico del fondo.', 
        prompt: 'Recreate the image with a prominent bokeh effect, rendering the background lights as soft, pleasing, out-of-focus orbs.'
      },
      { 
        id: 'natural-framing', 
        title: 'Encuadre natural', 
        description: 'Usar elementos del entorno para enmarcar.', 
        prompt: 'Recompose the image using natural framing, incorporating elements from the environment (like a doorway, window, or tree branches) to frame the main subject.'
      },
      { 
        id: 'negative-space', 
        title: 'Espacio negativo', 
        description: 'Uso del espacio vacío para resaltar el sujeto.', 
        prompt: 'Recompose the image to make strong use of negative space, surrounding the subject with a large area of empty or minimalist background to emphasize them.'
      },
      { 
        id: 'patterns-textures', 
        title: 'Patrones y texturas', 
        description: 'Repetición de elementos visuales.', 
        prompt: 'Recreate the image to emphasize patterns and textures. Zoom in or reframe to make repeating shapes, lines, or surface details the main focus.'
      },
      { 
        id: 'contrast', 
        title: 'Contraste', 
        description: 'Diferencias marcadas de luz, color o forma.', 
        prompt: 'Recreate the image with high contrast, emphasizing the difference between the light and dark areas to create a dramatic, bold look.'
      },
      { 
        id: 'silhouette', 
        title: 'Siluetas', 
        description: 'Sujetos oscuros contra fondos brillantes.', 
        prompt: 'Recreate the image as a silhouette, placing the main subject in front of a bright light source (like a sunset) so they appear as a dark shape without detail.'
      }
    ]
  },
  {
    title: 'Efectos de movimiento y tiempo',
    techniques: [
      { 
        id: 'panning', 
        title: 'Panning', 
        description: 'Seguir un sujeto en movimiento manteniendo el fondo borroso.', 
        prompt: 'Recreate the image with a panning motion effect. The main subject should be relatively sharp and in focus, while the background is streaked with horizontal motion blur to convey speed.'
      },
      { 
        id: 'long-exposure', 
        title: 'Larga exposición', 
        description: 'Capturar el movimiento a través del tiempo.', 
        prompt: 'Recreate the image with a long exposure effect. Stationary elements should be sharp, while moving elements (like water, clouds, or lights) should be blurred into smooth streaks.'
      },
      { 
        id: 'freeze-motion', 
        title: 'Congelado', 
        description: 'Detener completamente el movimiento.', 
        prompt: 'Recreate the image using a freeze motion effect. Capture a subject in rapid movement with extreme clarity and sharpness, as if frozen in time, with no motion blur.'
      },
      { 
        id: 'motion-blur', 
        title: 'Barrido', 
        description: 'Mostrar la sensación de velocidad.', 
        prompt: 'Recreate the image with significant motion blur on the main subject to give a strong sense of speed and movement, while the background remains relatively static.'
      }
    ]
  }
];

export const ALL_TECHNIQUES: CameraAngle[] = TECHNIQUE_CATEGORIES.flatMap(category => category.techniques);