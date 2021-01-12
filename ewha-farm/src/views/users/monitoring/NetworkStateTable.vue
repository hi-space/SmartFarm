<template>
  <div>
    <b-card-actions
      title="네트워크 상태"
      action-collapse
      no-body
    >
      <b-table-simple
        hover
        caption-top
        responsive
        class="rounded-bottom mb-0"
      >
        <b-thead head-variant="light">
          <b-tr>
            <b-th colspan="2">
              Region
            </b-th>
            <b-th colspan="3">
              Clothes
            </b-th>
            <b-th colspan="2">
              Accessories
            </b-th>
          </b-tr>
          <b-tr>
            <b-th>축사</b-th>
            <b-th>함체</b-th>
            <b-th>Trousers</b-th>
            <b-th>Skirts</b-th>
            <b-th>Dresses</b-th>
            <b-th>Bracelets</b-th>
            <b-th>Rings</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr>
            <b-th rowspan="3">
              제 1축사
            </b-th>
            <b-th>
              중앙 함체
            </b-th>
            <b-td>56</b-td>
            <b-td>22</b-td>
            <b-td>43</b-td>
            <b-td variant="success">
              72
            </b-td>
            <b-td>23</b-td>
          </b-tr>
          <b-tr>
            <b-th>
              Gent
            </b-th>
            <b-td>46</b-td>
            <b-td variant="warning">
              18
            </b-td>
            <b-td>50</b-td>
            <b-td>61</b-td>
            <b-td variant="danger">
              15
            </b-td>
          </b-tr>
          <b-tr>
            <b-th class="text-right">
              Brussels
            </b-th>
            <b-td>51</b-td>
            <b-td>27</b-td>
            <b-td>38</b-td>
            <b-td>69</b-td>
            <b-td>28</b-td>
          </b-tr>
          <b-tr>
            <b-th rowspan="2">
              제 2축사
            </b-th>
            <b-th class="text-right">
              Amsterdam
            </b-th>
            <b-td variant="success">
              89
            </b-td>
            <b-td>34</b-td>
            <b-td>69</b-td>
            <b-td>85</b-td>
            <b-td>38</b-td>
          </b-tr>
          <b-tr>
            <b-th class="text-right">
              Utrecht
            </b-th>
            <b-td>80</b-td>
            <b-td variant="danger">
              12
            </b-td>
            <b-td>43</b-td>
            <b-td>36</b-td>
            <b-td variant="warning">
              19
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td
              colspan="7"
              variant="secondary"
              class="text-right"
            >
              Total Rows: <b>5</b>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </b-card-actions>
  </div>
</template>

<script>
import {
  BTableSimple, BThead, BTr, BTh, BTd, BTbody, BTfoot,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'

export default {
  components: {
    BCardActions,
    BTableSimple,
    BThead,
    BTr,
    BTh,
    BTd,
    BTbody,
    BTfoot,
  },
}
</script>
