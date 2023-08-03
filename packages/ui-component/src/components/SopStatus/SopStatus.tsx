import { defineComponent, computed } from 'vue';

export type StatusTypeEnum = 'primary' | 'warning' | 'info' | 'danger' | 'all' | 'success';

export default defineComponent({
  name: 'SopStatus',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator(value: string) {
        return [
          'primary', 'warning', 'info', 'danger', 'all', 'success'
        ].indexOf(value) !== -1;
      }
    },
    color: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const iconColorStyle = computed(() => {
      if (props.color !== '') {
        return {
          backgroundColor: props.color
        };
      }

      return {};
    });

    return () => (
      <span class="sop-status">
        <i
          class={`sop-status__icon--${props.type}`}
          style={iconColorStyle.value}
        />
        {
          props.text &&
          <em class="sop-status__text">
            {props.text}
          </em>
        }
      </span>
    );
  },
});
