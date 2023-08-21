<template>
  <SopFilterForm>
    <SopDataTable :cols="5">
      <SopDataTableItem
        :border="false"
        label="ID 搜索"
      >
        <ElInput
          clearable
          placeholder="多个用空格或逗号隔开"
        >
          <template #prepend>
            <div style="width: 84px">
              <ElSelect>
                <ElOption
                  label="Track ID"
                  value="trackId"
                />
                <ElOption
                  label="ISRC"
                  value="isrc"
                />
                <ElOption
                  label="UPC"
                  value="UPC"
                />
                <ElOption
                  label="Album Id"
                  value="albumId"
                />
              </ElSelect>
            </div>
          </template>
        </ElInput>
      </SopDataTableItem>

      <SopDataTableItem
        :border="false"
        label="关键词"
      >
        <ElInput
          clearable
          placeholder="歌曲名称、专辑名称、艺人、厂牌"
        >
          <template #prepend>
            <div style="width: 84px">
              <ElSelect>
                <ElOption
                  label="歌曲名称"
                  value="songName"
                />
                <ElOption
                  label="专辑名称"
                  value="albumName"
                />
                <ElOption
                  label="艺人名称"
                  value="artist"
                />
                <ElOption
                  label="cp名称"
                  value="cpName"
                />
                <ElOption
                  label="厂牌"
                  value="factoryName"
                />
              </ElSelect>
            </div>
          </template>
        </ElInput>
      </SopDataTableItem>

      <SopDataTableItem
        :border="false"
        label="歌曲语言"
      >
        <ElSelect
          multiple
          filterable
          collapse-tags
          collapse-tags-tooltip
          placeholder="输入关键词搜索或直接选择"
        >
          <!-- <ElOption
            v-for="item in languageOptions"
            :key="item.id"
            :label="`${item.chineseName} (${item.englishName})`"
            :value="item.id"
          /> -->
        </ElSelect>
      </SopDataTableItem>

      <SopDataTableItem
        :border="false"
        label="有无人声"
      >
        <ElSelect>
          <ElOption
            label="全部"
            value=""
          />

          <ElOption
            label="无"
            value="0"
          />

          <ElOption
            label="有"
            value="1"
          />
        </ElSelect>
      </SopDataTableItem>

      <SopDataTableItem
        :border="false"
        label="歌曲状态"
      >
        <ElSelect>
          <ElOption
            label="全部"
            value=""
          />

          <ElOption
            label="审核通过"
            value="1"
          />

          <ElOption
            label="还未通过"
            value="0"
          />
        </ElSelect>
      </SopDataTableItem>

      <SopDataTableItem
        :border="false"
        label="授权场景"
      >
        <ElSelect
          multiple
          collapse-tags
          collapse-tags-tooltip
        >
          <ElOption
            label="数字发行"
            value="1"
          />

          <ElOption
            label="公播"
            value="2"
          />

          <ElOption
            label="影音同步"
            value="3"
          />

          <ElOption
            label="翻唱"
            value="4"
          />

          <ElOption
            label="改编"
            value="5"
          />

          <ElOption
            label="硬件内置"
            value="6"
          />
        </ElSelect>
      </SopDataTableItem>

      <!--
        此处权利项是合同系统里单一场景权利属性、权利项值的映射。
        ElOption 使用合同的字段 KV，最终格式化成搜索需要的 Object
      -->
      <SopDataTableItem
        :border="false"
        label="权利项"
      >
        <ElSelect
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="请选择权利项"
        >
          <ElOption
            label="独家授权"
            value="authorizedType"
          />

          <ElOption
            label="词版权"
            value="sharingRatioOfLyrics"
          />

          <ElOption
            label="曲版权"
            value="sharingRatioOfCompose"
          />

          <ElOption
            label="录音版权"
            value="sharingRatioOfRecord"
          />

          <ElOption
            label="表演者权"
            value="sharingRatioOfPerformance"
          />

          <ElOption
            label="需要 CP 同意"
            value="needNotifyCp"
          />

          <ElOption
            label="有定价权"
            value="hasPricingAuthority"
          />

          <ElOption
            label="可超期授权"
            value="canOverAuthorization"
          />

          <ElOption
            label="二次转授权"
            value="secondLevelAuthorization"
          />
        </ElSelect>
      </SopDataTableItem>

      <SopDataTableItem
        :border="false"
        label="授权结束日期晚于"
      >
        <ElDatePicker
          value-format=""
          placeholder="请选择授权结束日期晚于"
        />
      </SopDataTableItem>

      <SopDataTableItem
        :border="false"
        label="授权区域"
      >
        <ElSelect
          placeholder="请选择授权区域"
        >
          <ElOption
            label="全部"
            value=""
          />

          <ElOption
            label="全球"
            value="WW"
          />

          <ElOption
            label="大中华"
            value="CN,TW,HK,MO"
          />

          <ElOption
            label="中国大陆"
            value="CN"
          />
        </ElSelect>
      </SopDataTableItem>
    </SopDataTable>

    <template #opt>
      <ElButton>
        重置
      </ElButton>
      <ElButton
        type="primary"
      >
        查询
      </ElButton>
    </template>
  </SopFilterForm>

</template>

<script setup lang="ts">
import { SopDataTable } from '@/components/SopDataTable';
import { SopDataTableItem } from '@/components/SopDataTableItem';
</script>
