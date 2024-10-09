import React, {memo, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import CommentsList from "../../components/comments-list";
import commentsActions from "../../store-redux/comments/actions";
import useSelector from "../../hooks/use-selector";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id))
  }, [params.id]);

  const selectRedux = useSelectorRedux(
    state => ({
      article: state.article.data,
      comments: state.comments.data,
      count: state.comments.count,
      waiting: state.article.waiting,
      commentsWaiting: state.comments.waiting,
    }),
    shallowequal,
  );

  const select = useSelector(state => ({
    exists: state.session.exists
  }))

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback((id, text, _type) => dispatch(commentsActions.send(id, text, _type)), [dispatch, commentsActions.send]),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={selectRedux.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={selectRedux.waiting}>
        <ArticleCard article={selectRedux.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={selectRedux.commentsWaiting}>
        <CommentsList comments={selectRedux.comments} count={selectRedux.count} addComment={callbacks.addComment} isAuth={select.exists} params={params} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
