import { defineComponent, computed, ref, onMounted, onBeforeUnmount, type PropType } from 'vue';

export type CoverTypeEnum = 'album' | 'track' | 'cp' | 'customer' | 'contract' | 'dsp' | 'playlist-project' | 'playlist'

export default defineComponent({
  name: 'SopCover',
  props: {
    type: {
      type: String as PropType<CoverTypeEnum>,
      default: 'album',
    },
    src: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 72
    },
    height: {
      type: Number,
      default: 72
    },
    placeholder: {
      type: String,
      default: ''
    },
    isCoverEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cover-edit'],
  setup(props, ctx) {
    const { emit } = ctx;
    const coverRef = ref<HTMLDivElement | null>(null);
    const coverSize = ref({
      width: `${props.width}px`,
      height: `${props.height}px`,
    });

    const CoverTypeList = [
      'album',
      'track',
      'cp',
      'customer',
      'contract',
      'dsp',
      'playlist-project',
      'playlist'
    ];

    const backgroundStyle = computed(() => {
      return {
        backgroundPosition: `0 -${props.width * CoverTypeList.indexOf(props.type)}px`,
        backgroundSize: `${props.width}px auto`
      };
    });

    onMounted(() => {
      if (coverRef.value && props.isCoverEdit) {
        coverRef.value.addEventListener('mouseenter', mouseenterHandler);
        coverRef.value.addEventListener('mouseleave', mouseleaveHandler);
      }
    });

    onBeforeUnmount(() => {
      if (coverRef.value && props.isCoverEdit) {
        coverRef.value.removeEventListener('mouseenter', mouseenterHandler);
        coverRef.value.removeEventListener('mouseleave', mouseleaveHandler);
      }
    });

    function mouseenterHandler(event: MouseEvent) {
      const target = (event.target as HTMLElement).children.item(0) as HTMLElement;
      target.style.opacity = '1';
    }

    function mouseleaveHandler(event: MouseEvent) {
      const target = (event.target as HTMLElement).children.item(0) as HTMLElement;
      target.style.opacity = '0';
    }

    function isCoverShow() {
      if (props.src !== '') {
        return <img
          src={props.src ? props.src : ''}
          width={props.width ? props.width : 0}
          height={props.height ? props.height : 0}
        />;
      } else if (props.placeholder !== '') {
        return <span>
          { props.placeholder }
        </span>;
      } else {
        return <span
          class="default-cover"
          style={backgroundStyle.value}
        ></span>;
      }
    }

    return () => (
      <div
        ref={coverRef}
        class="sop-cover"
        style={coverSize.value}
      >
        <div
          class="edit"
          style={{
            ...coverSize.value,
            lineHeight: `${props.height}px`
          }}
        >
          {
            props.isCoverEdit &&
              <i
                class="sop-icon sop-icon--input"
                onClick={() => emit('cover-edit') as unknown as (payload: MouseEvent) => void}
              />
          }
        </div>

        {isCoverShow()}
      </div>
    );
  },
});
